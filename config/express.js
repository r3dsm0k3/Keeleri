var config = require('./config'),
	express = require('express'),
	redis = require('redis'),
	bodyParser = require('body-parser'),
	passport = require('passport'),
	flash = require('connect-flash'),
	session = require('express-session'),
	RedisStore = require('connect-redis')(session),
	validator = require('express-validator'),
	cookieParser = require('cookie-parser'),
	helmet = require('helmet'),
	fs = require('fs'),
	FileStreamRotator = require('file-stream-rotator'),
	morgan = require('morgan'),
	useragent = require('express-useragent'),
	RateLimit = require('express-rate-limit');

module.exports = function() {
	var client = redis.createClient({
		host: config.redisHost
	});
	var app = express();
	if(process.env.NODE_ENV == "production"){
		app.enable('trust proxy');
	}
	app.use(bodyParser.urlencoded( {
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(useragent.express());

	var logDirectory = __dirname+'/../logs/'
	// ensure log directory exists
	fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
	// create a rotating write stream
	var accessLogStream = FileStreamRotator.getStream({
	  date_format: 'YYYYMMDD',
	  filename: logDirectory + '/access-%DATE%.log',
	  frequency: 'daily',
	  verbose: false
	})

	// setup the logger
	app.use(morgan('combined', {stream: accessLogStream}))
	app.use(cookieParser());
	app.use(session({
		store: new RedisStore({
			client: client
		}),
		saveUninitialized: true,
		resave: true,
		secret: '3ef7b656e66af9999b55a2e64ff6f61b3a0c87a20f61fc5e4c2ad62f31',
		key:"sessionId"
	}));//random SHA256

	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	app.use(passport.initialize());
	app.use(passport.session());

	app.use(flash());
	app.use(validator());
	app.use(function (req, res, next) {
	  // Websites you wish to allow to connect
    var allowedOrigins = ['http://google.com']
		var origin = req.headers.origin;
		if(process.env.NODE_ENV != "production"){
			//allow everyone for development
			res.setHeader('Access-Control-Allow-Origin',"*")
			res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

		}else{
			if(allowedOrigins.indexOf(origin) > -1){
			     res.setHeader('Access-Control-Allow-Origin', origin);
					 res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
			}
		}
  	// Request methods you wish to allow
  	res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  	// Set to true if you need the website to include cookies in the requests sent
  	// to the API (e.g. in case you use sessions)
  	res.setHeader('Access-Control-Allow-Credentials', true);
  	// Pass to next layer of middleware
  	next();
	});
	// #### security inclusions ####
	// prevents from being iframed. <iframe src="eastereggURL" wont work
	app.use(helmet.frameguard('deny'));
	// to hide x-powered-by header
	app.use(helmet.hidePoweredBy());
	// uncomment hsts line to enable strict https
	app.use(helmet.hsts({ maxAge: 10886400000, includeSubDomains: true, force: true }));

	// "catch" all error handler
	app.use(function (err, req, res, next) {
		if (err.message) {
			res.send(500, { error: err.message });
		} else {
			res.send(500, { error: '500 - Internal Server Error' });
		}
	});

	// Adds these headers to all requests
	app.use(function(req, res, next) {
		res.header("Cache-Control", "no-cache, no-store, must-revalidate");
		res.header("Pragma", "no-cache");
		res.header("Expires", 0);
		next();
	});

	//changes all the query params to lowercase to handle case insensitivity.
	app.use(function(req, res, next) {
		make_lower_recursively(req.query);
		next();
	});

	function make_lower_recursively(obj){
		for (var key in obj){
			obj[key.toLowerCase()] = obj[key];
			if(typeof obj[key] === "object"){
				make_lower_recursively(obj.key);
			}
		}
	}
	// specify all the routes
  require('../app/routes/index.server.routes.js')(app);
	require('../app/routes/users.server.routes.js')(app);
	app.use(express.static('./public'));

	return app;
};
