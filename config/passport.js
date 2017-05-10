var passport = require('passport'),
	mongoose = require('mongoose');

module.exports = function() {
	var admin = mongoose.model('Users');

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		admin.findOne(
			{_id: id},
			'-password',
			function(err, user) {
				done(err, user);
			}
		);
	});

	require('./strategies/local.js')();
};
