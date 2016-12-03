
var express = require("express");
var app = express();

const passport = require("passport");

const flash    = require("connect-flash");
const bcrypt   = require('bcrypt-nodejs');
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const session      = require('express-session');

const static = express.static(__dirname + '/public');

var configRoutes = require("./routes");


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


configRoutes(app);



app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});