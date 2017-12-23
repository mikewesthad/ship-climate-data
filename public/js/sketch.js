/* eslint-disable no-new, new-cap, no-param-reassign */

const p5 = require("p5");
// require("p5/lib/addons/p5.dom");
// require("p5/lib/addons/p5.sound");

const fs = require("fs");
const { coordToSphericalMercator } = require("./lat-long-utils");
const shipPaths = require("../../data/ship-paths.json");

const scale = 10;
const shouldDrawMap = false;
const shouldDrawBg = false;
let img;

new p5(p => {
  p.preload = () => {
    img = p.loadImage("images/mercator-2.png");
  };

  p.setup = () => {
    p.createCanvas(scale * p.windowWidth, scale * p.windowHeight);
    p.colorMode(p.HSB, 360, 100, 100, 1);

    if (shouldDrawBg) p.background(0);
    if (shouldDrawMap) p.image(img, 0, 0);

    p.strokeWeight(1);
    p.noFill();
    for (const path of shipPaths) {
      // Either version with color or grayscale version - grayscale is used for the final render for
      // "Bound Lines"
      // p.stroke(p.random(190, 215), 100, 100, 1);
      p.stroke(0, 0, p.random(80, 100), 0.8);

      p.beginShape();

      let lastCoord = { x: path.coordinates[0].x, y: path.coordinates[0].y };
      for (const coord of path.coordinates) {
        const { x, y } = coordToSphericalMercator(coord.lat, coord.lon, p.width, p.height);

        // Catch points that wrap around the globe. Note: this should be replaced with something
        // that actually extend line to edge of the canvas eventually
        if (p.dist(x, y, lastCoord.x, lastCoord.y) > 50 * scale) {
          p.endShape();
          p.beginShape();
        }

        p.vertex(x, y);
        lastCoord = { x, y };
      }

      p.endShape();
    }

    save(p.canvas, `path-${Date.now()}.png`);
  };
});

// Custom save since p5's doesn't work for super large canvas renders
function save(canvas, filename) {
  canvas.toBlob(blob => {
    var reader = new FileReader();

    function onLoadEnd(e) {
      reader.removeEventListener("loadend", onLoadEnd);
      if (e.error) console.error("Unable to save canvas");
      const buffer = Buffer.from(reader.result);
      fs.writeFileSync(filename, buffer);
    }

    reader.addEventListener("loadend", onLoadEnd);
    reader.readAsArrayBuffer(blob);
  }, "image/png");
}
