var prompt = require('prompt')
var fs = require('fs')
var schedule = require('node-schedule')
var postInstaStory = require('./modules/postInstaStory')
var getPhotoPath = require('./modules/getPhotoPath')

const SCHEDULE = true
const CREDENTIALS_PATH = './.credentials'
const POST_INTERVAL = 5 // in minutes

if (fs.existsSync(CREDENTIALS_PATH)) {
  const credentialsData = fs.readFileSync(CREDENTIALS_PATH)
  const credentials = JSON.parse(credentialsData)
  init(credentials)
} else {

  prompt.get(['username', 'password'], function(err, res) {
    const credentials = {
      username: res.username,
      password: res.password
    }
    fs.writeFileSync(CREDENTIALS_PATH, JSON.stringify(credentials))
    init(credentials)
  })
}



function init(credentials) {

  // When the rules below are met, the job will execute
  // Format of the schdule job -> ('minute hour day month week_day')

  if (SCHEDULE) {
    setInterval(function(){
      launchPost(credentials)
    }, POST_INTERVAL * 60*1000);

  } else {
    // For testing purposes, post right away
    launchPost(credentials)
  }
}



function launchPost(credentials) {
  const user = credentials.username
  const pass = credentials.password

  const now = new Date()
  console.log('Executing a picture post at: '+now)

  getPhotoPath.getPhotoPath()
  .then((photoPath) => {
    // successMessage is whatever we passed in the resolve(...) function above.
    // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
    postInstaStory(user, pass, photoPath)
  })
  .catch((error) => {
    console.log(error)
  });
}
