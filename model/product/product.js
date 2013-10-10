/**
* Create, update, destroy, query product
*/
var Product = require('./../model').Product;
/**
* Provides some mathematical functions
*
* @class Product
**/

/*
* Create a new product
* @method add
* @param {JSON} product is the only param it take
* @return {Product} new product from model
*/

function create(product) {
	product = product || {};
	// check product is object type
	if (typeof product === 'object') {
		return new Product(product);
	}
	return null;	
}

/*
* Add a new product to Mongodb
* @method add
* @param {product} a product Model param
* @return {callback} error and success
*/

function add (product, callback) {
	product.save(function (err, success) {		
		if (err) {
			console.log(err);
			return callback(err);
		} else {
			return callback(null, success);
		}
	});
}

/*
* get a product by id
* @method getById
* @param {String} id
* @return {Object or null} product
*/

function getById (id, callback) {
	Product.findById(id, function (err, p) {
		if (err) {
			return callback(null);
		} else {
			return callback(p);
		}
	});
}

/*
* destroy product by id
* @method destroy
* @param {String} id
*/

function destroy(id) {
	Product.findByIdAndRemove(id, function (err, success) {
		if (err) {
			console.log(err);
		} else {
			console.log('remove product successfully');
		}
	});
}

/*
* find products 
* @method find
* @param {Object} conditions is its first
* @param {Object} fields is its second
* @param {Object} options is its last
* @return {Array} callback array list of objects
*/

function find(conditions, fields, options, callback) {
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

	Product.find(conditions, fields, options, function (err, products) {
		return callback(products);
	});
}

/*
* update image link of product
*/

function updateImageLink (id, link) {
	Product.findByIdAndUpdate(id, {coverPhoto : link}, function (err, success) {
		if (err) {
			console.log(err);
		} else {
			console.log("Update link success to database : " + link);
		}
	});
}

exports.create = create;
exports.add = add;
exports.getById = getById;
exports.destroy = destroy;
exports.find = find;
exports.updateImageLink = updateImageLink;