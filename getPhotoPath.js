var fs = require('fs')
var Jimp = require('jimp')
var average = require('image-average-color');
var rgbHex = require('rgb-hex');
var del = require('delete')
// USER PARAMS
const sourceFolder = 'photosToPost'+'/'
const afterPostFolder = 'photosPosted'+'/'
// end USER PARAMS
const testFolder = './'+sourceFolder

var allowedExtensions = ["JPG","jpg","JPEG","jpeg","PNG","png"]
// Instagram sizes
var w = 1080
var h = 1920

exports.getPhotoPath = function() {
  return new Promise((resolve, reject) => {
    var photos = [];
    fs.readdirSync(testFolder).forEach(file => {
      photos.push(file)
    })
    // Throw error if there are no photos
    if (photos.length < 1) reject('There are no photos left in: '+sourceFolder)
    var photo = getRandomItem(photos)

    // Dealing with different photo extensions
    var photoName = photo.split('.')[0]
    var extension = photo.split('.')[1]
    var photoPathSource = './'+sourceFolder+photo
    var photoPathOutput = './'+afterPostFolder+photoName+'.jpg'
    // Check if extension is allowed
    if (!extensionIsAllowed(extension)) {
      reject('ERROR, can not recognize photo extension. photo: '+photo)
    }
    // Resize the photo to fit the instagram specs
    // Fill the letter boxes with the average color of the bitmap
    getImageAverageColorHex(photoPathSource).then(function(color){
      var image = new Jimp(w, h, color, function (err, background) {
        // background.quality(60).write('img/DEMO.jpg')
        Jimp.read(photoPathSource).then(function (img) {
          img.scaleToFit(w, h)
             .quality(60);   // set JPEG quality
          var x = (w-img.bitmap.width)/2
          var y = (h-img.bitmap.height)/2
          background.composite( img, x, y )
               .write(photoPathOutput); // save
          resolve(photoPathOutput)
          cleanSourcePhoto(photoPathSource)
         })
      });
    })
  });
}

function getRandomItem(items) {
  return items[Math.floor(Math.random()*items.length)];
}

function cleanSourcePhoto(path) {
  del.sync([path]);
}

function getImageAverageColorHex(imgPath) {
  return new Promise((resolve, reject) => {
    average(imgPath, (err, color) => {
      if (err) throw err;
      var [r, g, b, a] = color;
      var hex = Jimp.rgbaToInt(r, g, b, a)
      resolve(hex)
    });
  });
}

function extensionIsAllowed(extension) {
  return (allowedExtensions.indexOf(extension) > -1);
}
