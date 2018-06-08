var prompt = require('prompt')
var fs = require('fs')
var schedule = require('node-schedule')
var postInstaStory = require('./modules/postInstaStory')
var getPhotoPath = require('./modules/getPhotoPath')
var email = require('./modules/email')

const CREDENTIALS_PATH = './.credentials'
const POST_INTERVAL_MIN = process.env.POST_INTERVAL_MIN
const USER = process.env.USER
const PASS = process.env.PASS

if (!USER) throw Error('Undefined process env: USER')
if (!PASS) throw Error('Undefined process env: PASS')
if (!POST_INTERVAL_MIN) throw Error('Undefined process env: POST_INTERVAL_MIN')
if (parseFloat(POST_INTERVAL_MIN) < 0.5) throw Error('Posting interval is too short, leave at least 0.5 min between posts. POST_INTERVAL_MIN: '+POST_INTERVAL_MIN)
if (!process.env.EMAILUSER) throw Error('Undefined process env: EMAILUSER')
if (!process.env.EMAILPASS) throw Error('Undefined process env: EMAILPASS')
if (!process.env.EMAILTO) throw Error('No receiver specified')

// Initialize cookies folder
fs.mkdirSync('./modules/cookies')


const credentials = {
  username: USER,
  password: PASS
}

if (process.env.POSTNOW) {
  launchPost(credentials)
}

console.log('STARTING POSTING INTERVAL with: '+parseFloat(POST_INTERVAL_MIN) * 60*1000+' ms')
setInterval(function(){
  launchPost(credentials)
}, parseFloat(POST_INTERVAL_MIN) * 60*1000);




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
    email.send('ERROR', JSON.stringify(error))
    console.log(error)
  });
}
