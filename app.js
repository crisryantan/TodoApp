var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var path = require('path');


var configDB = require('./controllers/database.js');

mongoose.connect(configDB.url);

require('./controllers/passport')(passport);

app.configure(function() {

	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.static(path.join(__dirname, 'public')));
	app.set('views', __dirname + '/views');
	app.engine('html', require('ejs').renderFile);
	app.use(express.session({ secret: 'yomema' }));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash());

});


require('./routes/routes.js')(app, passport);


app.listen(port);
console.log('Listening  to  port ' + port);
