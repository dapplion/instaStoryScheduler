const FastAverageColor = require('fast-average-color');
const fac = new FastAverageColor();
const color = fac.getColor('cat.jpeg');

console.log(color);
