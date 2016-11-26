
var dbConnection = require("../config/mongoConnection");
var data = require("../data/");
var users = data.users;
var taskList = data.taskList;


dbConnection().then(db => {
    return db.dropDatabase().then(() => {
            return dbConnection;
        }).then((db) => {
            return users.addUser("Oliver","Twist","Oliver@xyz.com","manager");
        }).then((Oliver) => {
            const id = Oliver._id;

        return taskList.addTask(id, "Install Oracle Database", "Oliver Twist", "olive@xyz.com", "We will be using the Oracle 11g database.", "12/31/2016", "11/18/2016", "low");

        }).then(() =>
        {
            console.log("Done seeding database");
            db.close();
        });


}, (error) => {
    console.error(error);
});