const mongoCollections = require("../config/mongoCollections");
const finalList = mongoCollections.finalList;
const taskList = mongoCollections.taskList;
const users = require("./users");
const uuid = require('node-uuid');

let exportedMethods = {



getAllTasksForUser(id) {
        //return finalList().then((taskCollection) => {
		return users.getUserById(id).then((userTask) => {
			return taskList().then((taskCollection) => 			
            {
			return taskCollection
			.find({})
			.toArray()
			.then((task) => {
                let taskArray = [];
                for(let i=0;i<task.length;i++){
                    taskArray.push({_id:task[i]._id,title:task[i].taskTitle});
                }
				let newFinalList = { 
				  _id: uuid.v4(),
				  /*creator: [
					{
					  creatorName: creatorName,
					  creatorEmail: creatorEmail,
					  id: id
					}
				  ],*/
				  tasks: taskArray
				};
				return newFinalList;
			});	
            });
        });
    } 
}

module.exports = exportedMethods;