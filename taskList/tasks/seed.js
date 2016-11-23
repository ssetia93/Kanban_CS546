const dbConnection = require("../config/mongoConnections");
const data = require("../data/");
const taskList = data.taskList;

dbConnection().then(function(db){
    return db.dropDatabase().then(() => {
        return dbConnection;
    }).then((db) => {
						//addTask(taskTitle, creatorName, creatorEmail, description, duedate, creationdate, priority) {
        return taskList.addTask("Installing the mongodb driver package", "Oliver Twist", "olive@xyz.com", "We will be using the official MongoDB driver released by the official Mongo team. We will be using this driver to setup connections to do basic querying against MongoDB", "10/31/2016", "10/28/2016", "high");
		console.log("Adding 1st Task");
			
 }).then((db) => {
					 
		return taskList.addTask("Setup a route", "Oliver Twist", "olive@xyz.com", "We will configure a route to get a list of all the user posts. We will be using the GET request method for the same.", "11/10/2016", "10/28/2016", "medium");		
			
 }).then((db) => {
			         
        return taskList.addTask("Install Oracle Database", "Oliver Twist", "olive@xyz.com", "We will be using the Oracle 11g database.", "12/31/2016", "11/18/2016", "low");
   			
 }).then((db) => {
	                 
        return taskList.addTask("Put script in crontab", "Oliver Twist", "olive@xyz.com", "We will be putting the service termination script in crontab", "01/31/2017", "12/29/2016", "high");
			
    }).then(() => {
        console.log("Done seeding database");
        db.close();
    });
}, (error) => {
    console.error(error);
});