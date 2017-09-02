const PI = Math.PI;

// Ref: https://stackoverflow.com/questions/14329691/convert-latitude-longitude-point-to-a-pixels-x-y-on-mercator-projection
function coordToSphericalMercator(latitude, longitude, mapWidth, mapHeight) {
  const x = ((longitude + 180) * (mapWidth / 360)) % mapWidth;
  const latRad = latitude * (PI / 180);
  const mercN = Math.log(Math.tan(PI / 4 + latRad / 2));
  const y = (mapHeight / 2 - mapWidth * mercN / (2 * PI)) % mapHeight;
  return { x, y };
}

module.exports = {
  coordToSphericalMercator
};
