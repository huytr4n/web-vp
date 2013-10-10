// test product
var product = require('./../model/product/product');

var p = {};
var tmp = product.create(p);

describe('new product', function () {
	it('return a model from JSON input', function () {
		expect(tmp._id).toBeDefined();
		expect(typeof tmp._id).toEqual('object');
	});
	it('deal with bad parameter', function () {
		var negative_product = product.create('a string');
		expect(negative_product).toBeNull();
	});
});

describe('add product', function () {
	xit('return error with empty product', function (done) {
		product.add(tmp, function (err, success) {
			expect(err).toBeDefined();
			done();
		});
	});
	it('save product', function (done) {
		product.add(tmp, function (err, success) {
			expect(err).toBeNull();
			expect(success).toBeDefined();
			expect(typeof success).toEqual('object');
			done();			
		});
	});
});

describe('get by id', function () {
	it('get product by id', function (done) {
		product.getById(tmp._id, function (p) {
			expect(p).toBeDefined();
			expect(typeof p).toEqual('object');
			done();
		});
	});
});

describe('destroy product', function () {	
	it('destroy product by id', function (done) {
		product.destroy(tmp._id);
		product.getById(tmp._id, function (p) {
			expect(p).toBeNull();			
			done();
		});
	});
});

describe('find products', function () {	
	it('find all', function (done) {
		product.find({}, null, {}, function (products) {
			expect(typeof products).toEqual('object');
			expect(products.length).toBeDefined();
			done();
		});
	});
	it('find by limit', function (done) {
		product.find({}, null, {'limit' : 1}, function (products) {
			expect(products.length).toBeLessThan(2);
			done();
		});
	});
	it('cast out of wrong parameter', function () {
		product.find('string', 'string', 'string', function (products) {
			expect(products.length).toEqual(0);
		});
	});
});