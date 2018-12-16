const fs = require('fs');
const MYSPORTSFEEDS = 'MYSPORTSFEEDS';
var MySportsFeeds = require('mysportsfeeds-node');

var msf = new MySportsFeeds('2.0', true);
msf.authenticate('c228afb4-593b-48dc-9fa4-744344', MYSPORTSFEEDS);

var teamRecord = function() {
    var data = msf.getData('nfl', '2018-regular', 'seasonal_standings', 'json', {team: 'houston-texans'});
    var record = data.then(function (res) {
        var record = {
            city: res.teams[0].team.city,
            name: res.teams[0].team.name,
            wins: res.teams[0].stats.standings.wins,
            losses: res.teams[0].stats.standings.losses
        }
        console.log(record);
        return record;
    }).catch(function (err) {
        if (err.statusCode === 304) {
            console.log("Data hasn't changed since last call.");
        }
        console.log('Produced error');
    });
    return record;
};

exports = module.exports = teamRecord; 