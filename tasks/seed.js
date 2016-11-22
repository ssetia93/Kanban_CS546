var dbConnection = require("../config/mongoConnection");
var data = require("../data/");
var users = data.users;


dbConnection().then(db => {
    return db.dropDatabase().then(() => {
            return dbConnection;
        }).then((db) => {
            var firstname = "Oliver";
            var lastname = "Twist";
            var email = "Oliver@xyz.com";
            var occupation = "Manager";
            return users.addUser(firstname,lastname,email,occupation);
        }).then((users) => {
            var id = users._id;

        }).then(() =>
        {
             var firstname = "Harry";
            var lastname = "Potter";
            var email = "hpotter@xyz.com";
            var occupation = "Student";
            return users.addUser(firstname,lastname,email,occupation);
        }).then((users) =>
        {
            var id = users._id;
             console.log("Done seeding database");
            db.close();
        });


}, (error) => {
    console.error(error);
});