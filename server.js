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

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});