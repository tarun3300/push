"use strict";

/**
Send an identical notification to multiple devices.
Possible use cases:
 - Breaking news
 - Announcements
 - Sport results
*/

const apn = require("apn");
var express = require("express");
var bodyParser = require("body-parser");
var path    = require("path");
var app = express();
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
app.use('/public',express.static(path.join(__dirname, './public')))
app.get('/',function(req,res){
  //res.json({'test':'test'});
 let tokens = ["c3bec0dfceabca8c68e31bc10b5629a274a1314e4be686a65ee3c528236469aa"];

let service = new apn.Provider({
	cert: "cert.pem",
	key: "certkey.pem",
});

let note = new apn.Notification({
	alert:  "Test of PushNotification",
	badge: 9,
	category: "accept"
});

// The topic is usually the bundle identifier of your application.
note.topic = "tgudela.pushOTP";

console.log(`Sending: ${note.compile()} to ${tokens}`);
service.send(note, tokens).then( result => {
		console.log("sent:", result.sent.length);
		console.log("failed:", result.failed.length);
		console.log(result.failed);
});
 
// For one-shot notification tasks you may wish to shutdown the connection
// after everything is sent, but only call shutdown if you need your 
// application to terminate.
service.shutdown();
});







var server = app.listen(8080, function () {
    console.log("Listening on port %s...", server.address().port);
});
 
