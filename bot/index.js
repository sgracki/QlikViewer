var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var mongoose = require('mongoose');
var secrets = require('/secrets');
var User = require('./models/User');
var path = require('path');
var async = require('async');
const FB_ACCESS_TOKEN = 'EAABvjrWKCeMBAA5Di9rOmargy1561JqEY6mhCPPiO2kLw82O52LZAAIFbUKaM6ZAiuneVE3z8EIzU6dgWYdqsQNhBFCFIJLCZCcvYNvs42apkPsyJcOjFhXWI0ngRA8QgOxWvsGXN032XB6xKdtY8mbru9zZAwVFdnFZAW1cZC64yD2EuHHkOt';

var port = process.env.PORT || 5000;
const APP_HOST = 'https://397b1c37.ngrok.io';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/webhook', function (req, res) {
    if (req.query['hub.verify_token'] === secrets.ACCESS_TOKEN) {
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Error, wrong validation token');
    }
})

app.post('/webhook', function (req, res) {
    for (var jj = 0; jj < req.body.entry.length; jj++) {

        var messaging_events = req.body.entry[jj].messaging;
        for (var i = 0; i < messaging_events.length; i++) {
            var myEvent = req.body.entry[jj].messaging[i];
            // console.log(myEvent)

            var event = JSON.parse(JSON.stringify(myEvent));
            var payload = '';
            var tools = new Tools(FB_ACCESS_TOKEN, event);
        }
    }
})