var pg = require('pg')

// Constructor
function Broadcast() {}

// class methods
Broadcast.prototype.create = function(site, message) {

    function getDbDate(date) {
        var dateString = date.getFullYear() + "-" + ('0' + (date.getMonth() + 1)).slice(-2) + "-" + ('0' + date.getDate()).slice(-2) + " " + ('0' + date.getHours()).slice(-2) + ":" + ('0' + date.getMinutes()).slice(-2) + ":" + ('0' + date.getSeconds()).slice(-2);
        return dateString;
    }

    function getDbQuery(date, message) {
        return "INSERT INTO broadcasts (created_at, updated_at, message, category) VALUES (\'" + date + "\', \'" + date + "\', \'" + message + "\', 'announcement') RETURNING id";
    }

    function getDbUrl(site) {
        var urlToUse = null;
        if (site === 'org') {
            urlToUse = process.env.ORG_DATABASE_URL;
        } else if (site === 'com') {
            urlToUse = process.env.COM_DATABASE_URL;
        } else {
            throw "Unknown site value (should be org or com)!"
        }
        return urlToUse;
    }

    var dbUrl = getDbUrl(site);

    var client = new pg.Client(dbUrl);
    client.connect(function(err) {
        if (err) {
            console.error('connection error', err.stack)
        } else {
            console.log('connected')
        }
    });

    var dbDate = getDbDate(new Date());
    var dbQuery = getDbQuery(dbDate, message);

    return client.query(dbQuery)
        .then(
            function(result, error) {
                if (error) throw error;
                client.end();
                return result.rows[0].id;
            });
};

// export the class
module.exports = Broadcast;