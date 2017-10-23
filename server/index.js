'use strict';

const express = require('express');
const bodyParser = require('body-parser').json;
const app = express();
const request = require('request');
const config = require('./config');
const logger = require('morgan');

app.use(logger('dev'));

const weatherKey = config.weatherKey;

app.use('/', express.static('public'));
app.use(bodyParser());

app.use('/api', (req, res, next) => {
	request(`https://api.darksky.net/forecast/${weatherKey}/42.3601,-71.0589`, (error, response, body) => {
		res.send(body);
	});
});

app.listen(3000, () => {
	console.log('Server is running on 3000.');
});