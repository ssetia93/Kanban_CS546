const mongoCollections = require("../config/mongoCollections");
const taskList = mongoCollections.list;
const users = require("./users");
const uuid = require('node-uuid');

let exportedMethods = {



getAllTasksForUser(id) {
        //return taskList().then((taskCollection) => {
		return users.getUserById(id).then((userTask) => {
			return taskList().then((taskCollection) => 			
            {
			return taskCollection
			.find({})
			.toArray()
			.then((task) => {
                let taskArray = [];
                for(let i=0;i<task.length;i++){
                    taskArray.push({_id:task[i]._id,title:task[i].title});
                }
				let newTaskList = { 
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
				return newTaskList;
			});	
            });
        });
    } 
}