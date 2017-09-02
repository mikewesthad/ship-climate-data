//   colorMode(HSB, 360, 100, 100, 1);

//   for (const [countryCode, records] of Object.entries(data)) {
//       if (["N", "RA"].includes(countryCode)) continue;
//       const color = colors[countryCode];
//     noStroke();
//     // fill(random(0, 360), 100, 100, 0.1);
//     fill(...color, 0.1);
//     for (const record of records) {
//       let { x, y } = coordToSphericalMercator(
//         record.latitude / 100,
//         record.longitude / 100,
//         width,
//         height
//       );
//       ellipse(x, y, 10);
//     }
//   }

//   let i = 0;
//   textSize(30);
//   for (const [countryCode, color] of Object.entries(colors)) {
//     fill(...color);
//     stroke(0);
//     text(countryCode, 10 + i * 50, height - 10);
//     i++;
//   }

// const countries = Object.keys(colors);
// let selectedCountryIndex = 0;
// function drawCountry() {
//   clear();
//   image(img, 0, 0);
//   const country = countries[selectedCountryIndex];
//   noStroke();
//   fill(240, 50, 230, 0.1);
//   for (const record of data[country]) {
//     let { x, y } = coordToSphericalMercator(
//       record.latitude / 100,
//       record.longitude / 100,
//       width,
//       height
//     );
//     ellipse(x, y, 10);
//   }
//   textSize(30);
//   fill(240, 50, 230);
//   stroke(0);
//   text(country, 10, height - 10);
//   saveCanvas(country, "png");
// }

// function mousePressed() {
//   drawCountry();
//   selectedCountryIndex++;
//   if (selectedCountryIndex >= countries.length) selectedCountryIndex = 0;
// }
