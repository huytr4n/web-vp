/*
* admin routing
*/
var Product = require('./../../model/product/product');

var options = require('./options').options;
var session = require("./../sessions/admin");
var fs = require('fs');

function route (app, xp) {
/*
********** ROUTING *******************
*/
	// admin add product page
	app.get('/admin/product/add', session.checkLogin, function (req, res) {
		var opt = options({
			'site' : 'private',
			'section' : 'product',
			'page' : 'add'
		});
		res.render('./admin/admin', opt);
	});

	// admin edit product page
	app.get('/admin/product/edit/:id', session.checkLogin, function (req, res) {
		var id = req.params.id;		
		var opt = options({
			'site' : 'private',
			'section' : 'product',
			'page' : 'edit'			
		});
		opt.id = id;
		res.render('./admin/admin', opt);
	});

	// admin manage product page
	app.get('/admin/product', session.checkLogin, function (req, res) {
		// paging, delete, add results
		var opt = options({
			'site' : 'private',
			'section' : 'product',
			'page' : 'view'
		});
		res.render('./admin/admin', opt);
	});

	// POST add product
	app.post('/admin/product/add', preAddProduct, function (req, res) {
		var p = Product.create(req.product);
		Product.add(p, function (err, success) {			
			var result = "";
			if (err) {
				result = "false";
			} else {
				result = "true";
			}
			res.redirect("/admin/product/add?result=" + result);
		});
	});
	// GET add image for produt page
	app.get("/admin/product/image/upload/:id", session.checkLogin, function (req, res) {
		var id = req.params.id;
		// render view
		var opt = options({
			'site' : 'private',
			'section' : 'product',
			'page' : 'image-add'
		});
		// add id to param
		opt.id = id;
		res.render('./admin/admin', opt);
	});
/*
*********** API ***************
*/
	// GET product api
	app.get('/admin/api/product/', function (req, res) {
		var conditions = {};
		var fields = {};
		var options = {};
		// find products
		Product.find(conditions, fields, options, function (products) {
			res.send(products);
		});
	});

	// GET product by id
	app.get('/admin/api/product/:id', session.secureApi, function (req, res) {
		var id = req.params.id;
		Product.getById(id, function (p) {
			res.send(p);
		});
	});	

	// GET destroy product by id
	app.get('/admin/product/destroy/:id', session.secureApi, function (req, res) {
		var id = req.params.id;
		if (id) {
			Product.destroy(id);
			res.send({code : 200});
		} else {
			res.send({code: 400, errorMsg : "id is invalid"});
		}
	});
	// POST upload image
	app.post('/admin/product/image/upload/:id', session.secureApi, function (req, res) {
		var id = req.params.id;
		// id is valid
		if (id && typeof id === "string") {
			// set upload path
			var writePath = "public/product-images/"+id;
			// create folder if it's not existed
			if (!fs.existsSync(writePath)) {
				fs.mkdirSync("public/product-images/"+id);
			}
			//upload image to hard disk
		    var newPath = writePath + "/" + req.files.image.name;
		    // image link
		    var imageLink = "/product-images/" + id + "/" + req.files.image.name;
		    uploadImage(req.files.image.path, newPath, id, imageLink);
		    // redirect 
		    res.redirect("/admin/product/");
		} else {
			res.redirect("/admin/product?upload=false");
		}
	});
};

var uploadImage = function (file, path, id, link) {
	fs.readFile(file, function (err, data) {
		// write file
		fs.writeFile(path, data, function (err) {
			if (err) {
				console.log(err);
			} else {
				console.log("upload file done : " + path);
				// add image link to product
				Product.updateImageLink(id, link);
			}
		});
	});
};

// prepare parameter
var preAddProduct = function (req, res, next) {
	var product = {
		'title' : req.body.title,
		'catalog' : req.body.catalog,
		'outline' : req.body.outline,
		'description' : req.body.description,
		'image' : {
			'url' : '',
			'size' : 0
		},
		'config' : {
			'CPU' : {
				'name' : req.body.CPU,
				'id' : ''
			},
			'RAM' : {
				'name' : req.body.RAM,
				'id' : ''
			},
			'VGA' : {
				'name' : req.body.VGA,
				'id' : ''
			},
			'HDD' : {
				'name' : req.body.HDD,
				'id' : ''
			},
			'other' : req.body.other		
		},
		'price' : {
			'number' : req.body.price_number,
			'currency' : req.body.price_currency
		}
	};
	req.product = product;
	next();
};

exports.route = route;