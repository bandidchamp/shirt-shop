var http = require('http'),
    path = require('path'),
    methods = require('methods'),
    express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cors = require('cors'),
    passport = require('passport'),
    errorhandler = require('errorhandler'),
    cors = require('cors');


// config.js 
const dotenv = require('dotenv');
const result = dotenv.config({ debug: true });
if (result.error) {
  throw result.error;
}
const { parsed: envs } = result;

// Create global app object
var app = express();
app.use(cors({
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE,UNLINK,LINK",
}));
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('method-override')());
app.use(errorhandler());

// Normal express config defaults
app.use(session({ secret: 'shirt-shop', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false  }));

app.use(require('./src/routes'));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: err
  }});
});

// finally, let's start our server...
var server = app.listen( process.env.BACKEND_PORT, function(){
  console.log('Listening on port ' + server.address().port);
});
