# instaStoryScheduler

## Instruccions

#### 1. Clone the repo in your server
```
git clone https://github.com/dapplion/instaStoryScheduler.git && cd instaStoryScheduler
```

#### 2. Install docker and docker-compose
```
sh installDocker.sh
```

#### 3. Create a .envs file with this variables
```
nano credentials.envs
```

```
USER=<instagram-username>
PASS=<instagram-password>
POST_INTERVAL_MIN=60
EMAILUSER=<gmail-account-address>
EMAILPASS=<gmail-account-password>
EMAILTO=<email-to-send-notification-to-address>
POSTNOW=true
```
- The email account will be used to send notifications to the emailto in case of success posting a picture or in case of error
- The POSTNOW flag triggers a post right away when launching the program

#### 4. Provide pictures
This app will feed from pictures at ```/usr/src/photos/toPost``` and after posting, it will move them to ```/usr/src/photos/posted``` 

You have to create a directory in your server at ```/usr/src/photos/toPost``` and fill it with png / jpeg / jpg pictures. If the app runs out of pictures it will crash and report so to the email provided.

#### 5. Run the service
``` 
docker-compose build && docker-compose up
```

## Credit

This repo is build on top of (instagram-private-api )[https://github.com/huttarichard/instagram-private-api] by @huttarichard

**End User License Agreement (EULA)**

  1) *You will not use* this repository for sending mass spam or any other malicious activity
  2) *We / You will not support* anyone who is violating this EULA conditions
  3) *Repository is just for learning / personal purposes* thus should not be part of any 
  	service available on the Internet that is trying to do any malicious activity (mass bulk request, spam etc.)
