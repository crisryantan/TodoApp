var crudTodo = require('../controllers/crudTodo.js');

module.exports = function(app, passport) {
		app.get('/',  function(request, response) {
			response.render('index.html',{ message: request.flash('error') });
		});

		app.get('/user', auth, crudTodo.displayTodo);

		app.get('/logout', function(request, response) {
			request.logout();
			response.redirect('/');
		});

		app.post('/login', passport.authenticate('login', {
			successRedirect : '/user',
			failureRedirect : '/',
			failureFlash : true
		}));

		app.get('/signup', function(request, response) {
			response.render('signup.html', { message: request.flash('signuperror') });
		});


		app.post('/signup', passport.authenticate('signup', {
			successRedirect : '/user',
			failureRedirect : '/signup',
			failureFlash : true
		}));

		app.get('*', function(req, res){
			res.send('page not found', 404);
		});

		app.post('/create', crudTodo.create);

		app.delete('/destroy/:id', crudTodo.destroy );

		app.put('/edit/:id', crudTodo.update);

};

function auth(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
		res.redirect('/');
}
