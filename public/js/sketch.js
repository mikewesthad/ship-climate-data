/* eslint-disable no-new, new-cap, no-param-reassign */

const p5 = require("p5");
// require("p5/lib/addons/p5.dom");
// require("p5/lib/addons/p5.sound");

const { coordToSphericalMercator } = require("./lat-long-utils");
const shipPaths = require("../../data/ship-paths.json");

const shouldDrawMap = false;
const shouldDrawBg = true;
let img;

new p5(p => {
  p.preload = () => {
    img = p.loadImage("images/mercator-2.png");
  };

  p.setup = () => {
    console.log(p.windowWidth, p.windowHeight)
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.colorMode(p.HSB, 360, 100, 100, 1);

    if (shouldDrawBg) p.background(0);
    if (shouldDrawMap) p.image(img, 0, 0);

    p.strokeWeight(2);
    p.noFill();
    for (const path of shipPaths) {
      // Either version with color or grayscale version
      p.stroke(p.random(190, 215), 100, 100, 0.1);
      // p.stroke(0, 0, p.random(80, 100), 0.1);

      p.beginShape();

      let lastCoord = { x: path.coordinates[0].x, y: path.coordinates[0].y };
      for (const coord of path.coordinates) {
        const { x, y } = coordToSphericalMercator(coord.lat, coord.lon, p.width, p.height);

        // Catch points that wrap around the globe. Note: this should be replaced with something
        // that actually extend line to edge of the canvas eventually
        if (p.dist(x, y, lastCoord.x, lastCoord.y) > 25) {
          p.endShape();
          p.beginShape();
        }

        p.vertex(x, y);
        lastCoord = { x, y };
      }

      p.endShape();
    }

    p.saveCanvas(`path-${Date.now()}`, "png");
  };
});
