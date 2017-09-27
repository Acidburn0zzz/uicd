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

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/broadcasts", function(request, response) {
    if (Object.keys(request.query).length === 0) {
        throw "Request is missing query parameters!"
    }

    var broadcast = new Broadcast();
    broadcast.create(request.query.site, request.query.message);
    response.sendStatus(200);
});

app.get("/incidents", function(request, response) {

    var page_id = process.env.STATUSPAGE_PAGE_ID;
    var api_key = process.env.STATUSPAGE_API_KEY;
    var host = "api.statuspage.io";
    var incident_url = "https://" + host + "/pages/" + page_id + "/incidents.json";

    var StatusPageAPI = require('statuspage-api');

    var statuspage = new StatusPageAPI({
        pageid: process.env.STATUSPAGE_PAGE_ID,
        apikey: process.env.STATUSPAGE_API_KEY,
        host: "api.statuspage.io", // Override the default host
        port: 443, // Override the default port
        // useragent: "statuspage-node",  // Override the default useragent
        debuglevel: "warn" // Set debug levele: debug, info, warn, error
    });

    var printIncidentTitle = function(result) {
        console.log("Status: ", result.status);
        if (result.error != null) {
            console.log("Error: ", result.error);
        }
        var incidents = [];
        if (result.status == "success") {
            for (var i = 0; i < result.data.length; i++) {
                console.log(result.data[i].status);
                if (result.data[i].status !== 'resolved') {
                    incidents.push(result.data[i].name);
                }
            }
            response.json(incidents);
        }
    }

    statuspage.get("incidents", printIncidentTitle);

});


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});