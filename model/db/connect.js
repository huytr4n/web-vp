var fs = require('fs');

/**
* read config file
* @return {JSON}
*/

function getConfig(callback) {
	fs.readFile('./model/db/dbconfig.json', function (err, data) {
		if (err) {
			return callback({});
		} else {			
			return callback(data.toString());
		}
	});
}

function saveConfig(data) {	
	fs.writeFile('./model/db/dbconfig.json', JSON.stringify(data), function (err) {
		if (err) {
			console.log(err);
		} else {
			console.log('file is saved!');
		}
	});
}

function getLink () {	
	var config = fs.readFileSync("./model/db/dbconfig.json");
	config = JSON.parse(config.toString()) || {};

	if (config.note === "local") {
		return "mongodb://localhost/" + config.dbname;
	} else {
		return "mongodb://" + config.user + ":" + config.password + "@" + config.link + "/" + config.dbname;
	}
}

exports.getConfig = getConfig;
exports.saveConfig = saveConfig;
exports.getLink = getLink;