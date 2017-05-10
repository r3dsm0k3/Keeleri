module.exports = function(app) {
    var index = require('../controllers/index.server.controller');
    var utils = require('../common/app.server.utils.js');
    app.get('/', index.render);
	  app.get('/index', index.render);
};
