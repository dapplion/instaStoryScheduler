var prompt = require('prompt')
var schedule = require('node-schedule')
var postInstaStory = require('./postInstaStory')
var getPhotoPath = require('./getPhotoPath')

prompt.get(['username', 'password'], function(err, res) {
  init(res.username, res.password)
})

// var user = 'guillem.lion'
// var pass = 'santcugat'
// init(user, pass)




function init(user, pass) {
  var date = new Date();
  console.log(date)
  // When the rules below are met, the job will execute
  // Format of the schdule job -> ('minute hour day month week_day')
  var rule = new schedule.RecurrenceRule();
  rule.hour = 13;
  rule.minute = 11;
  rule.second = 30;
  var j = schedule.scheduleJob(rule, function(fireDate){
    // Post a photo
    // Add a setTimeout with a random time to not post always at the same time
    console.log('Executing a picture post at: '+fireDate);
    getPhotoPath.getPhotoPath()
    .then((photoPath) => {
      // successMessage is whatever we passed in the resolve(...) function above.
      // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
      postInstaStory(user, pass, photoPath)
    })
    .catch((error) => {
      emailAPI.send(
  			'ERROR Story API: '+error,
  			JSON.stringify(error)
  		)
      console.log(error)
    });
  })
}
