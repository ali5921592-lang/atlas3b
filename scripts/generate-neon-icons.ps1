param(
  [string]$Source = (Join-Path $PSScriptRoot '..\assets\anatomy-neon-source.png')
)

Add-Type -AssemblyName System.Drawing
$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$sourceImage = [System.Drawing.Bitmap]::FromFile((Resolve-Path $Source).Path)
if ($sourceImage.Width -ne $sourceImage.Height) { throw 'Logo source must be square.' }

function New-Canvas([int]$size, [bool]$transparent = $false) {
  $canvas = [System.Drawing.Bitmap]::new($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($canvas)
  $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  if ($transparent) { $g.Clear([System.Drawing.Color]::Transparent) }
  else { $g.Clear([System.Drawing.Color]::FromArgb(5, 29, 58)) }
  return @($canvas, $g)
}

function Add-RoundedClip($g, [System.Drawing.Rectangle]$rect, [int]$radius) {
  $path = [System.Drawing.Drawing2D.GraphicsPath]::new()
  $d = $radius * 2
  $path.AddArc($rect.Left, $rect.Top, $d, $d, 180, 90)
  $path.AddArc($rect.Right - $d, $rect.Top, $d, $d, 270, 90)
  $path.AddArc($rect.Right - $d, $rect.Bottom - $d, $d, $d, 0, 90)
  $path.AddArc($rect.Left, $rect.Bottom - $d, $d, $d, 90, 90)
  $path.CloseFigure()
  $g.SetClip($path)
  $path.Dispose()
}

# Remove only the white outer margin of the supplied picture. Preserve the
# anatomical artwork and its existing dark rounded-square composition.
$sourceRect = [System.Drawing.Rectangle]::new(34, 33, 1185, 1185)
$masterPair = New-Canvas 1024
$master = $masterPair[0]; $graphics = $masterPair[1]
$destination = [System.Drawing.Rectangle]::new(0, 0, 1024, 1024)
Add-RoundedClip $graphics $destination 270
$graphics.DrawImage($sourceImage, $destination, $sourceRect, [System.Drawing.GraphicsUnit]::Pixel)
$graphics.ResetClip()
$graphics.Dispose()
$sourceImage.Dispose()

function Save-Resized([System.Drawing.Image]$image, [int]$size, [string]$relativePath, [bool]$round = $false, [bool]$foreground = $false) {
  $pair = New-Canvas $size $foreground
  $canvas = $pair[0]; $g = $pair[1]
  if ($round) { $g.SetClip([System.Drawing.Rectangle]::new(0, 0, $size, $size)); $circle = [System.Drawing.Drawing2D.GraphicsPath]::new(); $circle.AddEllipse(0, 0, $size, $size); $g.SetClip($circle); $circle.Dispose() }
  if ($foreground) {
    $margin = [int][Math]::Round($size * 0.16)
    $g.DrawImage($image, [System.Drawing.Rectangle]::new($margin, $margin, $size - 2 * $margin, $size - 2 * $margin))
  } else {
    $g.DrawImage($image, [System.Drawing.Rectangle]::new(0, 0, $size, $size))
  }
  $g.Dispose()
  $target = Join-Path $projectRoot $relativePath
  $canvas.Save($target, [System.Drawing.Imaging.ImageFormat]::Png)
  $canvas.Dispose()
}

Save-Resized $master 1024 'assets\icon-only.png'
Save-Resized $master 1024 'store\app-icon.png'
Save-Resized $master 512 'store\google-play-icon.png'
Save-Resized $master 192 'dist\icon-192.png'
Save-Resized $master 512 'dist\icon-512.png'
Save-Resized $master 1024 'ios\App\App\Assets.xcassets\AppIcon.appiconset\AppIcon-512@2x.png'

$legacy = @{ 'ldpi' = 36; 'mdpi' = 48; 'hdpi' = 72; 'xhdpi' = 96; 'xxhdpi' = 144; 'xxxhdpi' = 192 }
foreach ($density in $legacy.Keys) {
  $size = $legacy[$density]
  Save-Resized $master $size "android\app\src\main\res\mipmap-$density\ic_launcher.png"
  Save-Resized $master $size "android\app\src\main\res\mipmap-$density\ic_launcher_round.png" $true
  if ($density -ne 'ldpi') {
    Save-Resized $master ($size * 9 / 4) "android\app\src\main\res\mipmap-$density\ic_launcher_foreground.png" $false $true
  }
}
$master.Dispose()
Write-Output 'Neon anatomy logo icons generated.'
