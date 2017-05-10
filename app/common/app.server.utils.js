var crypto = require('crypto'),
    constants = require('../common/app.server.constants.js'),
    config = require('../../config/config.js'),
    moment = require('moment'),
    fs = require('fs'),
    RateLimit = require('express-rate-limit');
    
//calculate the sha256 hash of given input
module.exports.createhash = function(input) {
    return crypto.createHash('sha256').update(input).digest('hex');
}

exports.strict_rate_limiter = function(){
  var limiter = new RateLimit({
		windowMs: 10*60*1000, // 10 minutes
		max: 5, //maximum number of requests within the time
		delayAfter: 1, //start delaying after the specified request count
		delayMs: 1*1000 //delay 1 second
	});
  if(process.env.NODE_ENV != "production"){
    limiter = new RateLimit({
  		windowMs: 10*60*1000, // 10 minutes
  		max: 1000, //maximum number of requests within the time
  		delayMs: 0 //delay 1 second
  	});
  }
  return limiter
}
exports.liberal_rate_limiter = function(){
  var limiter = new RateLimit({
		windowMs: 10*60*1000, // 10 minutes
		max: 30, //maximum number of requests within the time
		delayAfter: 1, //start delaying after the specified request count
		delayMs: 1*1000 //delay 1 second
	});
  if(process.env.NODE_ENV != "production"){
    limiter = new RateLimit({
  		windowMs: 10*60*1000, // 10 minutes
  		max: 1000, //maximum number of requests within the time
  		delayMs: 0 //delay 1 second
  	});
  }
  return limiter
}
