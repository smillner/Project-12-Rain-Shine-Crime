'use strict';

const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../config');
const User = require('../model/user');
const url = require('url');
const http = require('http');
//weather api key
const weatherKey = config.key;

// use weather api to retrieve data for location
router.get('/api/weather/:coordinates', (req, res, next) => {
	let coordinates = req.params.coordinates;
	request(`https://api.darksky.net/forecast/${weatherKey}/${coordinates}`, (error, response, body) => {
		return res.send(body);
	});
});

//use crime api to retrieve data for location
router.get('/api/crime/:latitude/:longitude', (req, res, next) => { 
	let latitude = req.params.latitude;
	let longitude = req.params.longitude;
	let coordinates = {
		lat: latitude,
		lon: longitude
	};

	// use proximo add on to provide static IP address for spotcrime api
	let proxy = url.parse(process.env.PROXIMO_URL);
	console.log('proxy   ', proxy);
	let options = {
	    hostname: proxy.hostname,
	    port:     proxy.port || 80,
	    path:     `https://api.spotcrime.com/crimes.json?lat=${latitude}&lon=${longitude}&radius=0.02&key=privatekeyforspotcrimepublicusers-commercialuse-877.410.1607&_=1509493804097`,
	    headers:  {
	    	"Proxy-Authorization": `Basic ${new Buffer(proxy.auth).toString("base64")}`
		}
	};
	console.log('Header', options.headers);

	http.get(options,
		(res) => {
			console.log('Status Code', res.statusCode);
			console.log('Headers', res.headers);
			
		});
});

// 'proxy': 'http://scooter237:taco1234@us-wa.proxymesh.com:31280'

// post user info
router.post('/register', (req, res, next) => {
	if(req.body.email && req.body.password) {
		if(req.body.password !== req.body.confirmPassword) {
			const err = new Error('Passwords do not match.')
			err.status= 400;
			return next(err);
		}

		// create object with input form
		const userData = {
			email: req.body.email,
			password: req.body.password,
		};

		// use schema's create method to insert document into Mongo
		User.create(userData, (error, user) => {
			if(error) {
				return next(error);
			} else {
				return res.json('You will have access to new features coming soon!!');
			}
		});

	} else {
		const err = new Error('All fields required.');
		err.status = 400;
		return next(err);
	}
});


module.exports = router;
