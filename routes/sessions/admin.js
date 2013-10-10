/*
* @method: set login session
*/
var set = function (req, user) {
	var admin = {
		"name" : user.name.first + " " + user.name.last,
		"email" : user.email,
		"role" : "admin",
		"login" : true
	};
	req.session.login = admin;
};

/*
* @method: check login session
*/
var check = function (req) {
	if (req.session.login) {
		// check login and role
		if (req.session.login.login === true && req.session.login.role === "admin") {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
};

/*
* @check login
*/
var checkLogin = function (req, res, next) {
	if (check(req) === true) {
		next ();
	} else {
		res.redirect("/admin/login");
	}
};

/*
* @secure api
*/

var secureApi = function (req, res, next) {
	if (check(req) === true) {
		next ();
	} else {
		res.send({"error": "Not authorized!"});
	}
}

exports.set = set;
exports.check = check;
exports.checkLogin = checkLogin;
exports.secureApi = secureApi;