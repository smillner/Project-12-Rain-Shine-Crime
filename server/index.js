'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser').json;
const app = express();
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// mongodb connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rainshinecrime');
// if(process.env.NODE_ENV === 'production') {
// 	mongoose.connect('mongodb://heroku_c6qkdqmm:{{password}}@ds245615.mlab.com:45615/heroku_c6qkdqmm');
// } else {
// 	mongoose.connect('mongodb://localhost:27017/rainshinecrime');
// }

const db = mongoose.connection;

// mongo error
db.on('error', function(err) {
	console.error('connection error', err);
});

db.once('open', function() {
	console.log('db connection successful');
});

// use sessions to track logins
app.use(session({
	secret: 'I love tacos!',
	resave: true,
	saveUninitialized: false,
	store: new MongoStore({
		mongooseConnection: db
	})
}));

app.use(logger('dev'));


app.use(express.static(path.join(__dirname, '../dist')));
app.use(bodyParser());

// include routes
const routes = require('./routes/index');
app.use('/', routes);


app.get('*', (req, res) => {
	console.log(__dirname);
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// catch 404 and forward to global error handler
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// Express global error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: err.message
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log('Server is running on port', port);
});
