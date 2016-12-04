const mongoCollections = require("../config/mongoCollections");
const taskList = mongoCollections.taskList;
const users = require("./users");
const uuid = require('node-uuid');

let exportedMethods = {

getAllTasksForUser(id, listName) {
		return users.getUserById(id).then((userTask) => {
			return taskList().then((taskCollection) => 			
            {
			return taskCollection
			.find({})
			.toArray()
			.then((task) => {
                let taskArray = [];
                for(let i=0;i<task.length;i++){
					if(task[i].list == listName){
                    	taskArray.push({_id:task[i]._id,title:task[i].taskTitle});
					}
                }
				let newFinalList = { 
				  tasks: taskArray
				};
				return newFinalList;
			});	
            });
        });
    } 
}

module.exports = exportedMethods;