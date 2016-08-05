var express    = require('express');
var app        = express();
var passport   = require('passport');
var session    = require('express-session');
var routes     = require('./routes/routes.js');
var mongoose   = require('mongoose');
var bodyParser = require('body-parser')
app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/public'));

require('dotenv').load();
require('./config/passport.js')(passport);


mongoose.connect(process.env.MONGO_URI);

app.use(session({
	secret: 'secretJocarosa',
	resave: false,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes(app,passport);


var port = process.env.PORT || 8080;

app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});