var User = require('./../../model/user/user');

var options = require('./options').options;
var fs = require('fs');
var session = require("./../sessions/admin");

function route (app, xp) {

/*
* Routing section
*/
	// GET view users page
	app.get("/admin/user", session.checkLogin, function (req, res) {
		var opt = options({
			"site" : "private",
			"section" : "user",
			"page" : "view"
		});
		res.render("./admin/admin", opt);
	});
	// GET add user page
	app.get("/admin/user/add", session.checkLogin, function (req, res) {
		var opt = options({
			"site" : "private",
			"section" : "user",
			"page" : "add"
		});
		res.render("./admin/admin", opt);
	});
	// POST add user
	app.post("/admin/user/add", preAddUser, function (req, res) {
		var result = false;
		// add user
		User.add(User.create(req.user), function (err, success) {
			if (!err) {
				result = true;
			}
			res.redirect("/admin/user/add?result=" + result);
		});
	});
	// GET destroy user
	app.get("/admin/user/destroy/:id", function (req, res) {
		var id = req.params.id;
		if (id) {
			User.destroy(id);
			res.send({code : 200});
		} else {
			res.send({code : 400, errorMsg : "Missing id"});
		}
	});
	// POST do login
	app.post("/admin/login", function (req, res) {
		var email = req.body.email;
		var pwd = req.body.pwd;
		User.login(email, pwd, function (result, msg) {
			if (result === true) {
				// set session
				session.set(req, msg);
				res.redirect("/admin/product");
			} else {
				res.render("./admin/user/login", {
					"msg" : msg
				});
			}
		});
	});
/*
* API section
*/
	// GET users
	app.get("/admin/api/user", session.secureApi, function (req, res) {
		User.find({}, {}, {}, function (users) {
			res.send(users);
		});
	});
	app.get("/admin/api/keepalive", function (req, res) {
		User.find({}, {}, {}, function (users) {
			if(users.length > 0) {
				var tmp = {
					"name" : users[0].name.first,
					"id" : users[0]._id
				};
				res.send(tmp);
			} else {
				res.send({});
			}
		});
	});
}

var preAddUser = function (req, res, next) {
	var roles = [req.body.roles];
	var user = {
		"name" : {
			"first" : req.body.firstname,
			"last" : req.body.lastname
		},
		"email" : req.body.email,
		"password" : req.body.pwd,
		"role" : roles
	};
	req.user = user;
	next();
};

exports.route = route;