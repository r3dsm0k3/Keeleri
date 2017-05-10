var Users = require('mongoose').model('Users'),
    constants = require('../common/app.server.constants.js'),
    utils = require('../common/app.server.utils.js'),
    validator = require('express-validator'),
    crypto = require('crypto'),
    async = require("async"),
    moment = require('moment'),
    ObjectId = require('mongodb').ObjectID,
    crypto = require('crypto'),
    uuid = require('node-uuid');

exports.list_users = (req,res,next) => {
  res.render('listusers', {
		title: 'Keeleri'
	});
}
