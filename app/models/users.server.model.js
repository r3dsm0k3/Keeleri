var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto'),
	moment = require("moment");

var constants = require('../common/app.server.constants.js');

var usersSchema = new Schema({
	first_name: {
		type: String,
		trim: true
	},
	last_name: {
		type: String,
		trim: true
	},
	gender:{
		type:String,
		trim:true,
		default:"M"
	},
	email: {
		type: String
	},
	mobile_number:{
		type:Number,
		required:true,
		default:0000000000,
		set: function (v) { return Math.round(v); } //It defaults to Double with floating points, here we use a setter to modify the data
	},
	country_number: {
		type:String,
		required:true
	},
	country_code:{
		type:Number,
		default:91//INDIA
	},
	created_at:{
		type:Date,
		default:Date.now
	},
	updated_at:{
		type:Date,
		default:Date.now
	}
});

usersSchema.virtual('name').get(function(){
	return this.first_name+' '+this.last_name
});

usersSchema.set('toObject', { virtuals: true} );
usersSchema.set('toJSON', { virtuals: true} );
//arg0 can be either an array or just a number
usersSchema.statics.find_users_by_mobile_number = function(mobile_number, callback) {

	if(Array.isArray(mobile_number)){
		//find from the list
		this.find({"mobile_number":{$in:mobile_number}},function(e,docs){
			if(!e && docs)
				callback(true,docs);
			else
				callback(false,null)
		})
	}else{
		this.find({"mobile_number":mobile_number},function(e,docs){
			if(!e && docs)
				callback(true,docs);
			else
				callback(false,null)
		})
	}
};
usersSchema.statics.find_users_by_email = function(email, callback) {

	if(Array.isArray(email)){
		//find from the list
		this.find({"email":{$in:email}},function(e,docs){
			if(!e && docs)
				callback(true,docs);
			else
				callback(false,null)
		})
	}else{
		this.find({"email":email},function(e,docs){
			if(!e && docs)
				callback(true,docs);
			else
				callback(false,null)
		})
	}
};
usersSchema.pre('save', function(next){
	now = moment();
	this.updated_at = now;
	if (!this.created_at){
		this.created_at = now;
	}
	next();
});
mongoose.model('Users', usersSchema,"Users");
