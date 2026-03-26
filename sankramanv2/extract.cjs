const Jimp = require('jimp');

async function extract() {
  try {
    const minThreshold = 140; // 0-255 brightness threshold. Adjusted higher since sky is very bright yellow and dune is dark orange
    
    // Using Jimp to read the image
    const image = await Jimp.read('public/bg.jpg');
    
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const red   = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue  = this.bitmap.data[idx + 2];
      
      // Calculate luminance
      const luminance = 0.299*red + 0.587*green + 0.114*blue;
      
      if(luminance > minThreshold) {
        // Sky area (bright) -> transparent
        this.bitmap.data[idx + 3] = 0;
      } else {
        // Dune and character area (dark) -> opaque
        this.bitmap.data[idx + 3] = 255;
      }
    });

    await image.writeAsync('public/fg.png');
    console.log("Success");
  } catch (err) {
    console.error(err);
  }
}

extract();
