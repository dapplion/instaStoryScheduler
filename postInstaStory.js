var Client = require('./InstagramPrivateAPI.js').V1;
var emailAPI = require('./email')

module.exports = function (user, pass, photoPath) {
	var device = new Client.Device(user);
	var storage = new Client.CookieFileStorage(__dirname + '/cookies/someuser.json');

	// And go for login
	Client.Session.create(device, storage, user, pass)
		.then(function(session) {
	   	// Now you have a session, we can follow / unfollow, anything...
			// And we want to follow Instagram official profile
	    uploadStory(session, photoPath)
		})
}

function uploadStory(session, photoPath) {
  var userIDs = [ 123456, 654321, 321, 123 ]; // creates array of IDs from which to retrieve stories
  var stories = new Client.Feed.UserStory(session, userIDs);
  // fs.writeFileSync('dummy.jpg', image.data);
	console.log('Attempting to post: '+photoPath)
  stories.postPhoto(photoPath, ' ').then((media) => {
    // do something with media
    console.log('Successfully posted Story at timestamp: '+media.taken_at);
		emailAPI.send(
			'Posted Story',
			'Successfully posted Story at timestamp: '+media.taken_at
		)
  });

}

function followUser(session, userToFollow) {
  return [session, Client.Account.searchForUser(session, userToFollow)]
}

function uploadPhoto(session) {
  Client.Upload.photo(session, './dog_square.jpg')
	.then(function(upload) {
		// upload instanceof Client.Upload
		// nothing more than just keeping upload id
		console.log(upload.params.uploadId);
		return Client.Media.configurePhoto(session, upload.params.uploadId, 'akward caption');
	})
	.then(function(medium) {
		// we configure medium, it is now visible with caption
		console.log(medium.params)
	})
}
