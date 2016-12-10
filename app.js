
var express = require("express");
var app = express();
var multer  = require('multer');
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var fs = require('fs');
var uuid = require('node-uuid');
var nodemailer = require('nodemailer');
var schedule = require('node-schedule');
const data = require("./data");
const myData = data.signin;
app.use(cookieParser());
app.use(bodyParser.json());

var static = express.static(__dirname + '/public');
var configRoutes = require("./routes");
var exphbs = require('express-handlebars');
var Handlebars = require('handlebars');

var handlebarsInstance = exphbs.create({
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

var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(1, 6)];
rule.hour = 15;
rule.minute =26;
//rule.minute = new schedule.Range(0, 59, 2);

schedule.scheduleJob(rule, function(){

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'kanbanboard2016@gmail.com', // Your email id
            pass: 'KanBan546' // Your password
        }
    });

    myData.getAllUsers().then(function(applicationList) {

       applicationList.forEach(function (application) {
            myData.getUserById(application._id).then(function(userDetails) {

                var mailOptions = {
                    from: 'kanbanboard2016@gmail.com', // sender address
                    to: userDetails.email, // list of receivers
                    subject: 'Reminder', // Subject line
                    text: "Hello, Kindly follow up with your pending tasks at KANBAN!!"//, // plaintext body
                    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                        console.log(error);
                    }else{
                        console.log('Message sent: ' + info.response);
                    };
                });

            }, function(errorMessage) {
                console.log("errorMessage user"+errorMessage)
            });
       });

    }, function(errorMessage) {
        console.log("errorMessage for mailer"+errorMessage)
    });

});

var rewriteUnsupportedBrowserMethods = (req, res, next) => {
    // If the user posts to the server with a property called _method, rewrite the request's method
    // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
    // rewritten in this middleware to a PUT route
    if (req.body && req.body._method) {
        req.method = req.body._method;
        delete req.body._method;
    }

    // let the next middleware run:
    next();
};

app.use("/public", static);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(rewriteUnsupportedBrowserMethods);
app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');
configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});