// server.js
// where your node app starts

// init project
var express = require('express');
var Broadcast = require('./broadcast')

var app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
    response.sendFile(__dirname + '/views/index.html');
});

app.get("/dreams", function(request, response) {
    response.send(dreams);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/broadcasts", function(request, response) {
    if (Object.keys(request.query).length === 0) {
        throw "Request is missing query parameters!"
    }

    var broadcast = new Broadcast();
    broadcast.create(request.query.site, request.query.message);
    response.sendStatus(200);
});

// Simple in-memory store for now
//var dreams = [
//  "Find and count some sheep",
//  "Climb a really tall mountain",
//  "Wash the dishes"
//];
app.get("/statuspage", function(request, response) {

    var page_id = process.env.STATUSPAGE_PAGE_ID;
    var api_key = process.env.STATUSPAGE_API_KEY;
    var host = "api.statuspage.io";
    var incident_url = "https://" + host + "/pages/" + page_id + "/incidents.json";
    var output = "";
    var request = require('request');
    output = request('http://www.google.com', function(error, resp, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', resp && resp.statusCode); // Print the response status code if a response was received
        console.log('body:'); //, body); // Print the HTML for the Google homepage.
        response.send(body);
    });
    console.log(output);
    //response.send("n:");
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});