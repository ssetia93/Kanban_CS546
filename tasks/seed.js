var dbConnection = require("../config/mongoConnection");
var data = require("../data/");
var users = data.users;
var taskList = data.taskList;


dbConnection().then(db => {
    return db.dropDatabase().then(() => {
            return dbConnection;
        }).then((db) => {
            return users.addUser("Oliver","Twist","Oliver@xyz.com","manager","olive");
        }).then((Oliver) => {
            const id = Oliver._id;

    return taskList.addTask(id, "tasktodo","todo", "Oliver Twist", "olive@xyz.com", "We will be using the Oracle 11g database.", "12/31/2016", "11/18/2016", "low")
		.then(() => {
			return taskList.addTask(id, "task backup","backup", "Oliver Twist", "olive@xyz.com", "We will be installing the MongoDB server.", "01/11/2016", "12/18/2016", "high")//;
		}).then(() => {
			return taskList.addTask(id, "task doing","doing", "Oliver Twist", "olive@xyz.com", "We will be installing the MongoDB server.", "01/11/2016", "12/18/2016", "high")//;
		}).then(() => {
			return taskList.addTask(id, "task done","done", "Oliver Twist", "olive@xyz.com", "We will be installing the MongoDB server.", "01/11/2016", "12/18/2016", "high")//;
		
		})
		
		}).then(() => {
        return users.addUser("Sherlock","Holmes","Sherlock@xyz.com","pl");
		
        }).then(() =>
        {
            console.log("Done seeding database");
            db.close();
        });


}, (error) => {
    console.error(error);
});