var port = 7337;
var dev_db = "KeeleriDB";
module.exports = {
	port: port,
	redisHost: 'k-redis',
	redisPort: 6379,
	db: 'mongodb://k-mongo/'+dev_db
};
