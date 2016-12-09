const mongoCollections = require("../config/mongoCollections");
const taskList = mongoCollections.taskList;
const users = require("./users");
const uuid = require('node-uuid');

let exportedMethods = {

getAllTasksForUser(id) {
		return users.getUserById(id).then((userTask) => {
			return taskList().then((taskCollection) => 			
            {
			return taskCollection
			.find({})
			.toArray()
			.then((task) => {
                let taskArray = [];
                for(let i=0;i<task.length;i++){
                    	taskArray.push({id:task[i]._id,title:task[i].taskTitle,list:task[i].list});
                }
				let newFinalList = { 
				  _id: uuid.v4(),
				  tasks: taskArray
				};
				return newFinalList;
			});	
            });
        });
    } 
}

module.exports = exportedMethods;