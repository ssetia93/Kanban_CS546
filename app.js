
var express = require("express");
var app = express();

const passport = require("passport");

const flash    = require("connect-flash");
const bcrypt   = require('bcrypt-nodejs');
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const session      = require('express-session');

var configRoutes = require("./routes");


app.use(bodyParser.json());
configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});