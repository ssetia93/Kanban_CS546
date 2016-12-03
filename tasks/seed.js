<<<<<<< HEAD
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

    return taskList.addTask(id, "Install Oracle Database", "Oliver Twist", "olive@xyz.com", "We will be using the Oracle 11g database.", "12/31/2016", "11/18/2016", "low")
		.then(() => {
			return taskList.addTask(id, "Install MongoDb", "Oliver Twist", "olive@xyz.com", "We will be installing the MongoDB server.", "01/11/2016", "12/18/2016", "high")//;
		
		});
		
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



/*return comments.addComment(id, title,"A spicy tasty snack loved by everybody."," Shradha" )
            .then((result) => {
                return comments.addComment(id,title,"Fried green chillies on the side complement this dish","Ankita");
            })
            .then(() => {
                return comments.addComment(id,title,"Tastes fabulous when served hot","Vidhi");
            });
			
 }).then((db) => {
        return recipes.addRecipe("French Toast", "Eggs", "2", "Prepare the mixture. Dip bread pieces in the mixture. Fry it.");
    }).then((recipe) => {
		const title = recipe.title;
        const id = recipe._id;
		
        return comments.addComment(id, title,"A quick healthy breakfast recipe","Vivek" )
            .then((result) => {
                return comments.addComment(id,title,"Filling and tasty","Pratiksha");
            })
            .then(() => {
                return comments.addComment(id,title,"Can never go wrong with this dish","Aditi");
=======

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

    return taskList.addTask(id, "Install Oracle Database", "Oliver Twist", "olive@xyz.com", "We will be using the Oracle 11g database.", "12/31/2016", "11/18/2016", "low")
		.then(() => {
			return taskList.addTask(id, "Install MongoDb", "Oliver Twist", "olive@xyz.com", "We will be installing the MongoDB server.", "01/11/2016", "12/18/2016", "high")//;
		
		});
		
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



/*return comments.addComment(id, title,"A spicy tasty snack loved by everybody."," Shradha" )
            .then((result) => {
                return comments.addComment(id,title,"Fried green chillies on the side complement this dish","Ankita");
            })
            .then(() => {
                return comments.addComment(id,title,"Tastes fabulous when served hot","Vidhi");
            });
			
 }).then((db) => {
        return recipes.addRecipe("French Toast", "Eggs", "2", "Prepare the mixture. Dip bread pieces in the mixture. Fry it.");
    }).then((recipe) => {
		const title = recipe.title;
        const id = recipe._id;
		
        return comments.addComment(id, title,"A quick healthy breakfast recipe","Vivek" )
            .then((result) => {
                return comments.addComment(id,title,"Filling and tasty","Pratiksha");
            })
            .then(() => {
                return comments.addComment(id,title,"Can never go wrong with this dish","Aditi");
>>>>>>> origin/master
            });*/