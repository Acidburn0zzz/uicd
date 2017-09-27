var pg = require('pg')

// Constructor
function Broadcast() {}
// class methods
Broadcast.prototype.create = function(site, message) {

    var urlToUse = null;
    if (site === 'org') {
        urlToUse = process.env.ORG_DATABASE_URL;
    } else if (site === 'com') {
        urlToUse = process.env.COM_DATABASE_URL;
    } else {
        throw "Unknow site value (shoulg be org or com)!"
    }
    var client = new pg.Client(urlToUse);
    client.connect(function(err) {
        if (err) {
            console.error('connection error', err.stack)
        } else {
            console.log('connected')
        }
    });

    var now = new Date();
    var nowString = now.getFullYear() + "-" + ('0' + (now.getMonth() + 1)).slice(-2) + "-" + ('0' + now.getDate()).slice(-2) + " " + ('0' + now.getHours()).slice(-2) + ":" + ('0' + now.getMinutes()).slice(-2) + ":" + ('0' + now.getSeconds()).slice(-2);
    var query = "INSERT INTO broadcasts (created_at, updated_at, message, category) VALUES (\'" + nowString + "\', \'" + nowString + "\', \'" + message + "\', 'announcement')";

    client.query(query, function(err, res) {
        if (err) throw err
        console.log(res)
        client.end()
    });
};

// export the class
module.exports = Broadcast;