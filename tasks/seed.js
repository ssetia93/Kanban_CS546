var dbConnection = require("../config/mongoConnection");
var data = require("../data/");
var users = data.users;


dbConnection().then(db => {
    return db.dropDatabase().then(() => {
            return dbConnection;
        }).then((db) => {
            return users.addUser("Oliver","Twist","Oliver@xyz.com","manager");
        }).then((Oliver) => {
            var id = Oliver._id;

        }).then(() =>
        {
            return users.addUser("Harry","Potter","hpotter@xyz.com","student");
        }).then((Harry) =>
        {
            var id = Harry._id;
            
        }).then(() =>
        {
            console.log("Done seeding database");
            db.close();
        });


}, (error) => {
    console.error(error);
});