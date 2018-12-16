const express = require('express');
const hbs = require('hbs');
const path = require('path');
const favicon = require('serve-favicon');
const fs = require('fs');
const port = process.env.PORT || 3000;
const nflFeed = require('./../mysportsfeed/football/nflFeed');
const {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var app = express();

hbs.registerPartials(__dirname + '/../views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.');
        }
    });
    next();
});

app.use(favicon(path.join(__dirname,'../favicon.ico')));

app.use(express.static(path.join(__dirname + '/../public')));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Plus Analytics - Homepage',
        welcomeMessage: 'Welcome to PlusAnalytics.'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'Plus Analytics - About Page'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

// app.use((req, res, next) => {
//     res.render('maint.hbs');
// });