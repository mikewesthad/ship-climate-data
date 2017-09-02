const readline = require("readline");
const fs = require("fs");
const path = require("path");
const parseLine = require("./utils/parse-line");

const inputPath = path.join(__dirname, "..", "data", "cliwoc21.txt");
const outputPath = path.join(__dirname, "..", "data", "ship-paths.json");

const rl = readline.createInterface({
  input: fs.createReadStream(inputPath, { encoding: "utf-8" })
});

const ships = [];
const selectedVariables = { ID: "id", LAT: "lat", LON: "lon", C1: "countryCode" };
let lastId = null;

rl.on("line", line => {
  const data = parseLine(line, selectedVariables);

  // Skip data missing latitude and longitude
  if (!data.lat || !data.lon) return;

  if (lastId !== data.id) {
    // New ship
    const { lat, lon, countryCode } = data;
    ships.push({
      countryCode,
      coordinates: [{ lat: parseInt(lat, 10) / 100, lon: parseInt(lon, 10) / 100 }]
    });
  } else {
    // Update existing ship
    const { lat, lon } = data;
    const lastShip = ships[ships.length - 1];
    lastShip.coordinates.push({ lat: parseInt(lat, 10) / 100, lon: parseInt(lon, 10) / 100 });
  }

  lastId = data.id;
});

rl.on("close", () => {
  fs.writeFileSync(outputPath, JSON.stringify(ships));
});
