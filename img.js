var fs = require('fs');
var imgGen = require('js-image-generator');

// Generate one image
imgGen.generateImage(1080, 1920, 10, function(err, image) {
    fs.writeFileSync('dummy.jpg', image.data);
});
