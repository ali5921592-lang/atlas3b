$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$storeDir = Join-Path $repoRoot 'store'
$edgeCandidates = @(
    (Join-Path ${env:ProgramFiles(x86)} 'Microsoft\Edge\Application\msedge.exe'),
    (Join-Path $env:ProgramFiles 'Microsoft\Edge\Application\msedge.exe')
)
$edgePath = $edgeCandidates | Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1
if (-not $edgePath) { throw 'Microsoft Edge is required to rasterize the checked-in SVG store artwork.' }

function Render-Svg($sourceName, $outputName, $width, $height, $transparent = $false) {
    $source = Join-Path $storeDir $sourceName
    $output = Join-Path $storeDir $outputName
    Remove-Item -LiteralPath $output -Force -ErrorAction SilentlyContinue
    $profile = Join-Path $env:TEMP ('anatomi-store-art-' + [guid]::NewGuid().ToString('N'))
    $uri = ([uri](Resolve-Path -LiteralPath $source).Path).AbsoluteUri
    $argsList = @('--headless=new', '--no-first-run', '--no-default-browser-check', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', "--user-data-dir=$profile", "--window-size=$width,$height", "--screenshot=$output")
    if ($transparent) { $argsList += '--default-background-color=00000000' }
    $argsList += $uri
    $edgeProcess = Start-Process -FilePath $edgePath -ArgumentList $argsList -Wait -PassThru -WindowStyle Hidden
    if ($edgeProcess.ExitCode -ne 0) { throw "Edge failed while rendering $sourceName (exit $($edgeProcess.ExitCode))." }
    if (-not (Test-Path -LiteralPath $output)) { throw "Edge did not create $outputName" }
    $bitmap = [System.Drawing.Bitmap]::new($output)
    try {
        if ($bitmap.Width -ne $width -or $bitmap.Height -ne $height) { throw "$outputName has unexpected dimensions $($bitmap.Width)x$($bitmap.Height)" }
    } finally { $bitmap.Dispose() }
    Remove-Item -LiteralPath $profile -Recurse -Force -ErrorAction SilentlyContinue
}

function Save-ScaledPng($sourcePath, $targetPath, $size) {
    $source = [System.Drawing.Bitmap]::new($sourcePath)
    $target = [System.Drawing.Bitmap]::new($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    try {
        $graphics = [System.Drawing.Graphics]::FromImage($target)
        try {
            $graphics.Clear([System.Drawing.Color]::Transparent)
            $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
            $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
            $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
            $graphics.DrawImage($source, 0, 0, $size, $size)
        } finally { $graphics.Dispose() }
        $target.Save($targetPath, [System.Drawing.Imaging.ImageFormat]::Png)
    } finally { $target.Dispose(); $source.Dispose() }
}

$iconPng = Join-Path $storeDir 'app-icon.png'
$featurePng = Join-Path $storeDir 'google-feature-tr.png'
Render-Svg 'app-icon.svg' 'app-icon.png' 1024 1024
$featureScreen = Join-Path $storeDir 'google-feature-screen.png'
Render-Svg 'google-feature-tr.svg' 'google-feature-screen.png' 1024 768
$screen = [System.Drawing.Bitmap]::new($featureScreen)
$feature = [System.Drawing.Bitmap]::new(1024, 500, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
try {
    $g = [System.Drawing.Graphics]::FromImage($feature)
    try { $g.DrawImage($screen, [System.Drawing.Rectangle]::new(0, 0, 1024, 500), [System.Drawing.Rectangle]::new(0, 134, 1024, 500), [System.Drawing.GraphicsUnit]::Pixel) } finally { $g.Dispose() }
    $feature.Save($featurePng, [System.Drawing.Imaging.ImageFormat]::Png)
} finally { $feature.Dispose(); $screen.Dispose() }
Remove-Item -LiteralPath $featureScreen -Force

Copy-Item -LiteralPath $iconPng -Destination (Join-Path $repoRoot 'assets\icon-only.png') -Force
Copy-Item -LiteralPath $iconPng -Destination (Join-Path $repoRoot 'ios\App\App\Assets.xcassets\AppIcon.appiconset\AppIcon-512@2x.png') -Force
Copy-Item -LiteralPath (Join-Path $storeDir 'app-icon.svg') -Destination (Join-Path $repoRoot 'dist\icon.svg') -Force
Save-ScaledPng $iconPng (Join-Path $storeDir 'google-play-icon.png') 512
Save-ScaledPng $iconPng (Join-Path $repoRoot 'dist\icon-512.png') 512

Save-ScaledPng $iconPng (Join-Path $repoRoot 'dist\icon-192.png') 192

$androidRes = Join-Path $repoRoot 'android\app\src\main\res'
$legacySizes = @{ldpi=36; mdpi=48; hdpi=72; xhdpi=96; xxhdpi=144; xxxhdpi=192}
$foregroundSizes = @{mdpi=108; hdpi=162; xhdpi=216; xxhdpi=324; xxxhdpi=432}
foreach ($density in $legacySizes.Keys) {
    $folder = Join-Path $androidRes "mipmap-$density"
    foreach ($name in @('ic_launcher.png', 'ic_launcher_round.png')) { Save-ScaledPng $iconPng (Join-Path $folder $name) $legacySizes[$density] }
}
foreach ($density in $foregroundSizes.Keys) {
    Save-ScaledPng $iconPng (Join-Path $androidRes "mipmap-$density\ic_launcher_foreground.png") $foregroundSizes[$density]
}
Set-Content -LiteralPath (Join-Path $androidRes 'values\ic_launcher_background.xml') -Encoding utf8 -Value @'
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="ic_launcher_background">#102039</color>
</resources>
'@

Write-Output "Created iOS/Android/web icons and Google Play feature graphic."
