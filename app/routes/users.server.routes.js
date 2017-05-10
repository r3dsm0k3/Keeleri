var users = require('../../app/controllers/users.server.controller.js'),
	utils = require('../common/app.server.utils.js'),
	limiter = utils.strict_rate_limiter();


module.exports = function(app) {
	// Admin Console APIs
	app.route('/users').get(users.list_users);
};
