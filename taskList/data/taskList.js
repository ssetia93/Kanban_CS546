const mongoCollections = require("../config/mongoCollections");
const taskList = mongoCollections.taskList;
const uuid = require('node-uuid');

let exportedMethods = {
    getAllTasks() {
        return taskList().then((taskCollection) => {
            return taskCollection
			.find({})
			.toArray()
			.then((task) => {
                let taskArray = [];
                for(let i=0;i<task.length;i++){
                    taskArray.push({_id:task[i]._id,title:task[i].title});
                }
                return taskArray;
            });
        });
    },
    getTaskById(id) {
        return taskList().then((taskCollection) => {
            return taskCollection
			.findOne({ _id: id })
			.then((task) => {
                if (!task) 
					throw "task not found";
                return task;
            });
        });
    },
    addTask(taskTitle, creatorName, creatorEmail, description, duedate, creationdate, priority) {
        return taskList().then((taskCollection) => {
            
			let newTask = { 
              _id: uuid.v4(),
              title: taskTitle,
              creator: [
                {
                  name:creatorName,
                  email: creatorEmail,
				  _id: uuid.v4()
                }
              ],
              description: description,
              duedate: duedate,
			  creationdate: creationdate,
			  priority: priority
            };

            return taskCollection
			.insertOne(newTask)
			.then((newInsertInformation) => {
                return newInsertInformation.insertedId;
				
            }).then((newId) => {
                return this.getTaskById(newId);
				
            });
        });
    },
    otherAddTask(taskTitle, creator, description, duedate, creationdate, priority) {
        return taskList().then((taskCollection) => {
            let newTask = { 
              _id: uuid.v4(),
              title: taskTitle,
              creator: creator,
              description: description,
              duedate: duedate,
			  creationdate: creationdate,
			  priority: priority
            };

            return taskCollection
			.insertOne(newTask)
			.then((newInsertInformation) => {
                return newInsertInformation.insertedId;
				
            }).then((newId) => {
                return this.getTaskById(newId);
				
            });
        });
    },
    
	removeTask(id) {
        return taskList().then( (taskCollection) => {
            return taskCollection.removeOne({ _id: id }).then((deletionInfo) => {
                if (deletionInfo.deletedCount === 0) {
                    throw ("Could not delete post with id of "+id);
                } else { }
            });
        });
    },
    
    updateTask(id, updatedTask) {
        return taskList().then((taskCollection) => {
            let updatedTaskData = {};         

            if (updatedTask.title) {
                updatedTaskData.title = updatedTask.title;
            }

            if (updatedTask.ingredients) {
                updatedTaskData.ingredients = updatedTask.ingredients;
            }

			if (updatedTask.steps) {
                updatedTaskData.steps =updatedTask.steps;
            }
			
            let updatedCommand = {
                $set: updatedTaskData
            };

            return taskCollection
			.updateOne({ _id: id }, updatedCommand)
			.then((result) => {
             
                return this.getTaskById(id);
            });
        });
    },
    	
}

module.exports = exportedMethods;