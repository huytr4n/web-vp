// validate user
function validate (user_schema, User) {
	// validate email
	user_schema.path("email").validate(function (value, done) {
		if ( value.indexOf("@") !== -1 ) {
			User.findOne({ "email" : value }, function (err, user) {
				if (user !== null) {
					done(false);
				} else {
					console.log("email is true!!!!!!!!!!")
					done(true);
				}
			});
		} else {
			done(false);
		}	
	}, "email is not valid");
	// validate password
	user_schema.path("password").required(true);
}

exports.validate = validate;