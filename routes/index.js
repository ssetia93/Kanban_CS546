var userRoutes = require("./users");
var taskRoutes = require("./taskList");
var listRoutes = require("./list");

var constructorMethod = (app) => 

{
    app.use("/users", userRoutes);
    app.use("/taskList", taskRoutes);
    app.use("/list", listRoutes);

     //middlewares
	
      app.get('/signin', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('auth/signin', { message: req.flash('loginMessage') }); 
    });

      app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('auth/signup', { message: req.flash('signupMessage') });
    });

   app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

     // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/home', // redirect to the secure private section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

      // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/home', // redirect to the secure private section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


    app.use("*", (req, res) => 
    {
        res.sendStatus(404);
    })
};

    
module.exports = constructorMethod;

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}