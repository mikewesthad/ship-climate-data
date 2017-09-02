const countryLookup = {
    ES: "Spain",
    FR: "France",
    NL: "The Neatherlands",
    UK: "United Kingdom",
    SE: "Sweden",
    US: "USA",
    DE: "Germany",
    DK: "Denmark"
  };

module.exports = function countryCodeToName(code) {
    return countryLookup[code];
}