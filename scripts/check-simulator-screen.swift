import AppKit
import Darwin

guard CommandLine.arguments.count == 2,
      let data = FileManager.default.contents(atPath: CommandLine.arguments[1]),
      let image = NSBitmapImageRep(data: data) else {
    exit(1)
}

// The launch screen and empty viewer are pale blue. Sample the middle of the
// screen for the warm-colored muscle geometry in the atlas's default view.
let columns = 38
let rows = 44
var anatomySamples = 0
for row in 0..<rows {
    let y = Int((0.18 + 0.58 * Double(row) / Double(rows - 1)) * Double(image.pixelsHigh))
    for column in 0..<columns {
        let x = Int((0.08 + 0.84 * Double(column) / Double(columns - 1)) * Double(image.pixelsWide))
        guard let color = image.colorAt(x: x, y: y)?.usingColorSpace(.deviceRGB) else { continue }
        if color.redComponent > color.greenComponent + 0.10 &&
            color.redComponent > color.blueComponent + 0.10 {
            anatomySamples += 1
        }
    }
}

exit(anatomySamples * 50 >= columns * rows ? 0 : 1)
