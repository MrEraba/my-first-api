// >>>  imports  <<< //
var User = require('../models/user');
var express = require('express');
var userRoutes = express.Router();

var jwt = require('jsonwebtoken');
var config = require('./config');

userRoutes.use('superScret', config.secret);
// >>> User routes <<< //

userRoutes.route('/users').get(function (req, res) {
	User.findOne({},'name', 'admin', function (err, users) {
		if (err) throw err;

		res.json(user);
	}):
});

userRoutes.route('/setup').get(function (req, res) {
	var user = new User({
		name : 'ivan',
		password : '007',
		admin : true
	});

	user.save(function (err) {
		if (err) throw err;

		res.json({
			message : 'Default user created!'
		});
	});
});

userRoutes.route('/authenticate').post(function (req, res) {

	User.findOne({ name : req.body.name }, function (err, user) {
		if (err) throw err;

		if (!user) {
			res.json({
				success : false,
				message : 'Authentication failed. User not found'
			});
		} else if (user.password != req.body.password) {
			res.json({
				success : false,
				message : 'Authentication failed. Wrong password'
			});
		} else {

			var token = jwt.sign(user, userRoutes.get('superScret'), {
				expireInMinutes: 1440
			});

			res.json({
				success : true,
				message : 'Enjoy your token!'
			});
		}
	});
});

userRoutes.use(function (req, res, next) {

	var token = req.body.token || req.query.token || req.headers['x-access-token'];


	if (token) {

		jwt.verify(token, userRoutes.get('superScret'), function (err, decoded) {
			if (err) {
				return res.json({
					success : false,
					message : 'Failed to authenticate token.'
				});
			} else {
				req.decoded = decoded;
				next();
			}
		})

	} else {

		return res.status(403).send({
			success : false,
			message : 'No token provided.'
		});
	}

});



















