const fs = require("fs");
const path = require("path");
const parseLine = require("./utils/parse-line");
const { LineStream } = require("byline");
const through2 = require("through2");
const Stringify = require("streaming-json-stringify");

const inputPath = path.join(__dirname, "..", "data", "cliwoc21.txt");
const outputPath = path.join(__dirname, "..", "data", "all-records.json");

const selectedVariables = {
  ID: "id",
  LAT: "lat",
  LON: "lon",
  C1: "countryCode",
  YR: "year",
  MO: "month",
  HR: "hour",
  VoyageTo: "voyageTo",
  VoyageFrom: "voyageFrom",
  ShipName: "shipName",
  D: "windDirection",
  W: "windSpeed"
};

const inStream = fs.createReadStream(inputPath, { defaultEncoding: "utf-8" });
const outStream = fs.createWriteStream(outputPath, { defaultEncoding: "utf-8" });
let lineNum = 0;

inStream
  .pipe(new LineStream())
  .pipe(
    through2.obj((chunk, enc, callback) => {
      const line = chunk.toString();
      const data = parseLine(line, selectedVariables);
      lineNum += 1;
      if (lineNum % 10000 === 0) {
        console.log(`Progress ${(lineNum / 287114 * 100).toFixed(2)}%`);
      }
      callback(null, data);
    })
  )
  .pipe(Stringify({ space: 0, opener: "[", closer: "]", seperator: "," }))
  .pipe(outStream);
