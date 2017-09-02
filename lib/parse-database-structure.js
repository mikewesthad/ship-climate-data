const fs = require("fs");
const cheerio = require("cheerio");
const path = require("path");

const inputPath = path.join(__dirname, "..", "data", "database-structure.html");
const outputPath = path.join(__dirname, "..", "data", "database-structure.json");

const html = fs.readFileSync(inputPath);
const $ = cheerio.load(html);
const tables = $("table");
const coreRows = tables.eq(1).find("tbody tr");
const attachementRows = tables.eq(2).find("tbody tr");

const databaseStructure = {};

coreRows.each((rowIndex, row) => {
  if (rowIndex === 0) return; // Skip first column - labels
  const [variableName, start, end, format, description] = $(row)
    .find("td")
    .map((colIndex, td) =>
      $(td)
        .text()
        .trim()
    )
    .get();
  databaseStructure[variableName] = {
    start: parseInt(start, 10),
    end: parseInt(end, 10),
    format,
    description
  };
});

attachementRows.each((rowIndex, row) => {
  if (rowIndex === 0) return; // Skip first column - labels
  const [variableName, start, end, format, description, remarks] = $(row)
    .find("td")
    .map((colIndex, td) =>
      $(td)
        .text()
        .trim()
    )
    .get();
  databaseStructure[variableName] = {
    start: parseInt(start, 10),
    end: parseInt(end, 10),
    format,
    description,
    remarks
  };
});

fs.writeFileSync(outputPath, JSON.stringify(databaseStructure));
