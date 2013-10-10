
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.session({secret : "vp"}));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// admin routing
var admin_route = require('./routes/backend/admin');
admin_route.route(app, null);

var admin_product_route = require('./routes/backend/product');
admin_product_route.route(app, null);

var admin_user_route = require('./routes/backend/user');
admin_user_route.route(app, null);

// frontend routing

var frontend_route = require("./routes/frontend/main");
frontend_route.route(app, null);
// connect db
var mongoose = require('mongoose');
var dbConnect = require('./model/db/connect');
var dbLink = dbConnect.getLink();

mongoose.connect(dbLink);