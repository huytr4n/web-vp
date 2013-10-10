var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// product Schema
var product_schema = new Schema({
	'title' : String,
	'catalog' : String,
	'outline' : String,
	'coverPhoto' : String,
	'config' : {
		'CPU' : {
			'name' : String,
			'id' : String
		},
		'RAM' : {
			'name' : String,
			'id' : String
		},
		'VGA' : {
			'name' : String,
			'id' : String
		},
		'HDD' : {
			'name' : String,
			'id' : String
		},
		'other' : String		
	},
	'price' : {
		'number' : Number,
		'currency' : String
	},
	'description' : { type : String, default: "" },
	'sales' : {
		'type' : String,
		'amount' : String,
		'date' : {
			'from' : Date,
			'to' : Date
		}
	}
});

/*
* User model
*/
var user_schema = new Schema ({
	"name" : {
		"first" : { type : String, default : "" } ,
		"last" : { type : String, default : "" }
	},
	"email" : { type : String, default : "" },
	"info" : {
		"birthday" : String,
		"phone" : [ {type : String} ],
		"country" : String,
		"city" : String,
		"address" : String
	},
	"time_stamp" : {
		"created_at" : { type : Date, default: Date.now },
		"last_modified" : { type : Date, default : Date.now },
		"last_login" : { type : Date, default : Date.now },
		"login_failed" : { type : Number, default : 0 }
	},
	"password" : { type: String, default : ""},
	"role" : { type : Array, default : [] }
});

// create model
var Product = mongoose.model('Product', product_schema, 'product');
var User = mongoose.model('User', user_schema, 'user');

// validate
var user_validate = require("./user/validate");
user_validate.validate(user_schema, User);

exports.User = User;
exports.Product = Product;