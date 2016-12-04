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
        res.render('auth/login', { message: req.flash('loginMessage') }); 
    });

      app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('auth/signup', { message: req.flash('signupMessage') });
    });

     app.get('/profile', isLoggedIn, function(req, res) {
        res.render('private.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    app.use("*", (req, res) => 
    {
        res.sendStatus(404);
    })
};
    
module.exports = constructorMethod;