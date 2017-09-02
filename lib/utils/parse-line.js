const databaseStructure = require("../../data/database-structure.json");

const variableNames = Object.keys(databaseStructure);
const defaultSelection = {};
variableNames.forEach(variableName => {
  defaultSelection[variableName] = variableName;
});

/**
 * Parse the line using the database structure JSON.
 * 
 * @param {string} line Line of text from the ASCII database 
 * @param {object} [selectedVariables=defaultSelection] Optionally filter the data that gets 
 * selected by passing in an object, e.g. { YR: year, ... } which will return { year: 1985, ... }. 
 * By default, all fields are pulled and returned (using the labels from the database).
 * @returns {object} An object contain each variable requested, { variableName: variableValue }
 */
function parseLine(line, selectedVariables = defaultSelection) {
  const data = {};
  for (const [variableName, newVariableName] of Object.entries(selectedVariables)) {
    const { start, end } = databaseStructure[variableName];
    const variableValue = line.slice(start - 1, end).trim();
    data[newVariableName] = variableValue;
  }
  return data;
}

module.exports = parseLine;
