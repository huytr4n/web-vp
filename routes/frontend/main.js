/*
* @Class : routing for frontend
*/
var route = function (app, xp) {
	// Homepage
	app.get("/", function (req, res) {
		res.render("index", {"title" : "Home"});
	});
};

exports.route = route;