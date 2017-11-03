'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
	}
});	

// hash password before saving password
UserSchema.pre('save', function(next) {
	const user = this;
	bcrypt.hash(user.password, 10, function(err, hash){
		if(err) {
			return next(err);
		} 
			user.password = hash;
			next();
	});
});

const User = mongoose.model('User', UserSchema);

module.exports = User;	