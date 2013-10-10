/**
* Create, update, destroy, query user
*/
var _ = require("underscore");
var User = require('./../model').User;

/**
* Provides some mathematical functions
*
* @class User
**/

/*
* Create a new user
* @method add
* @param {JSON} user is the only param it take
* @return {User} new user from model
*/

function create(user) {
	user = user || {};
	// check product is object type
	if (typeof user === 'object') {
		return new User(user);
	}
	return null;	
}

/*
* Add a new user to Mongodb
* @method add
* @param {user} a user Model param
* @return {callback} error and success
*/

function add (user, callback) {
	user.save(function (err, success) {		
		if (err) {
			console.log(err);
			return callback(err);
		} else {
			return callback(null, success);
		}
	});
}

/*
* destroy user by id
* @method destroy
* @param {String} id
*/

function destroy(id) {
	User.findByIdAndRemove(id, function (err, success) {
		if (err) {
			console.log(err);
		} else {
			console.log('remove user successfully');
		}
	});
}

/*
* find users 
* @method find
* @param {Object} conditions is its first
* @param {Object} fields is its second
* @param {Object} options is its last
* @return {Array} callback array list of objects
*/

function find (conditions, fields, options, callback) {
	// check types
	if (typeof conditions !== 'object') {
		conditions = {};
	}
	if (typeof fields !== 'object' || fields !== null) {
		fields = {};
	}
	if(typeof options !== 'object') {
		options = {};
	}

	User.find(conditions, fields, options, function (err, users) {
		return callback(users);
	});
}
/*
* login function
* @method login
* @param {String} email
* @param {String} password
* @return {Boolean} access
*/

function login (email, pwd, callback) {
	User.findOne({"email" : email}, function (err, user) {
		if (err) {
			console.log(err);
			return callback(false, "db server is down");
		} else {
			if (user !== null) {
				// check password
				if (user.password && user.password === pwd) {
					// check role
					if (user.role && _.contains(user.role, "admin")) {
						return callback(true, user);
					} else {
						return callback(false, "user has no permission");
					}
				} else {
					return callback(false, "wrong password");
				}
			} else {
				return callback(false, "email doesn't existed!");
			}
		}
	});
}

exports.create = create;
exports.add = add;
exports.find = find;
exports.destroy = destroy;
exports.login = login;