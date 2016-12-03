
var express = require("express");
var app = express();

const passport = require("passport");

const flash    = require("connect-flash");
const bcrypt   = require('bcrypt-nodejs');
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const session      = require('express-session');

const static = express.static(__dirname + '/public');




app.use("/public", static);

app.use(cookieParser()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(session({
    secret: 'secret', 
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 


const LocalStrategy    = require("passport-local").Strategy;
const data = require("./data");
const User = data.users;

 let isMatch = function(password,userPassword) {
    return bcrypt.compareSync(password, userPassword);
    }

    passport.use('local-login', new LocalStrategy({ usernameField : 'username', passwordField : 'password', passReqToCallback : true },
    
    function(req, username, password, done) {
       
        process.nextTick(function() {
            User.getUser(username , function(err, user) {
               
                if (err)
                    return done(err);

                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.'));

                if (!isMatch(password, user.password))
                    return done(null, false, req.flash('loginMessage', 'Wrong password.'));
                else
                    return done(null, user);
            });
        });

    }));

     passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    
    passport.deserializeUser(function(id, done) {
        User.getUserById(id, function(err, user) {
            done(err, user);
        });
    });


var configRoutes = require("./routes");

const exphbs = require('express-handlebars');

const Handlebars = require('handlebars');

const handlebarsInstance = exphbs.create({
    defaultLayout: 'main',
    // Specify helpers which are only registered on this instance.
    helpers: {
        asJSON: (obj, spacing) => {
            if (typeof spacing === "number")
                return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

            return new Handlebars.SafeString(JSON.stringify(obj));
        }
    },
    partialsDir: [
        'views/partials/'
    ]
});

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
    
    if (req.body && req.body._method) {
        req.method = req.body._method;
        delete req.body._method;
    }

   
    next();
};

app.use(rewriteUnsupportedBrowserMethods);

app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});