var port = 7337;
var prod_db = "KeeleriDB";
module.exports = {
	port: port,
	redisPort: 6379,
	redisHost: 'k-redis',
	db: 'mongodb://k-mongo/'+prod_db
};
