var express = require('express');
var session = require('express-session');
var db = require('./db');

// Middleware
var morgan = require('morgan');
var parser = require('body-parser');

// Router
var router = require('./routes.js');

var app = express();

module.exports.app = app;

var port = process.env.PORT || 3000;

// Set what we are listening on.
app.set('port', port);

// Logging and parsing
app.use(morgan('dev'));
app.use(parser.json());

app.use(session({
  secret: 'mE2bNdyu2p',
  resave: false,
  saveUninitialized: true,
}));

// Set up our routes
app.use('/', router); //Formerly '/classes'
// Serve the client files
app.use(express.static(__dirname + '/../workout-app'));


// If we are being run directly, run the server.
if (!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}

