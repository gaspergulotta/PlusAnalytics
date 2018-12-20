require('./config/config');

const express = require('express');
const hbs = require('hbs');
const http = require('http');
const path = require('path');
const favicon = require('serve-favicon');
const fs = require('fs');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
const partialsPath = path.join(publicPath, '/views/partials');
// const nflFeed = require('./../mysportsfeed/football/nflFeed');
// const {ObjectID} = require('mongodb');
// var {mongoose} = require('./db/mongoose');
// var {User} = require('./models/user');
//var morgan = require('morgan');

//Initialize app and client/server relationship
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

//Set path directory
app.use(express.static(publicPath));
hbs.registerPartials(partialsPath);
app.set('view engine', 'hbs');

//Logger
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.ip} | ${req.User} | ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.');
        }
    });
    next();
});

//Set up favicon
app.use(favicon(path.join(__dirname,'../favicon.ico')));

//Register helper - consider refactoring
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

//Direct application to root
app.get('/', (req, res) => {
    res.render(`${publicPath}/home.hbs`, {
        pageTitle: 'Plus Analytics - Homepage',
        welcomeMessage: 'Welcome to PlusAnalytics.'
    });
});

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('Client disconencted');
    })
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

// app.use((req, res, next) => {
//     res.render('maint.hbs');
// });