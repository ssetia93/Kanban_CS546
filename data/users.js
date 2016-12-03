<<<<<<< HEAD
const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const uuid = require('node-uuid');

var exportmethods = 
{

 getAllUsers() 

 {
     return users().then((userdata) =>
     {
         return userdata.find({}).toArray();
     });
 },

  getUserById(id) 
 
 {
    return users().then((userdata) =>
    {
         return userdata.findOne({_id: id}).then((user) =>
         {
             if(!user) throw "User Does not exist";
             return user;

         });
       
    });
 },

  addUser(firstName,lastName,email,occupation)
   {
        return users().then((userdata) => {
           var newUser = {
               
                firstName: firstName,
                lastName: lastName,
                email: email,
                occupation: occupation,
                 _id: uuid.v4(),
                 tasks: []
                
            };
        return userdata.insertOne(newUser).then((newInsertInformation) => {
            return newInsertInformation.insertedId;
                    }).then((newId) => {
                        return this.getUserById(newId);
            });
                
        });
    },

   
   updateUser(id, newdetails)
     {
        return this.getUserById(id).then((userdata) =>
        {
            var updatedetails = {};

            if(newdetails.firstName) 
            {
              updatedetails.firstName = newdetails.firstName;
            }

            if(newdetails.lastName) 
            {
              updatedetails.lastName = newdetails.lastName;
            }

            if(newdetails.email) 
            {
              updatedetails.email = newdetails.email;
            }

            if(newdetails.occupation) 
            {
              updatedetails.occupation = newdetails.occupation;
            }

            var updateCommand =
            {
                 $set: updatedetails
            };

            return userdata.updateOne({_id : id} , updateCommand).then(() =>
            {
                return this.getUserById(id);
            });
        });
     },

      addTaskToUser(id, taskId, taskTitle, creatorName, creatorEmail, description, duedate, creationdate, priority )
    {
        return this.getUserById(id).then((currentUser) => {

            return userdata.updateOne({ _id: id }, {
                $addToSet: {
                    tasks : {
                        id: taskId,
                        title: taskTitle,
                        creator: [
                            {
                                creatorName: creatorName,
                                creatorEmail: creatorEmail,
                                id: id
                                
                            }
                        ],
                        description: description,
                        duedate: duedate,
			            creationdate: creationdate,
			            priority: priority

                    }
                }
            });
        });
    }


}
 
 
=======
const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const uuid = require('node-uuid');

var exportmethods = 
{

 getAllUsers() 

 {
     return users().then((userdata) =>
     {
         return userdata.find({}).toArray();
     });
 },

  getUserById(id) 
 
 {
    return users().then((userdata) =>
    {
         return userdata.findOne({_id: id}).then((user) =>
         {
             if(!user) throw "User Does not exist";
             return user;

         });
       
    });
 },

  addUser(firstName,lastName,email,occupation)
   {
        return users().then((userdata) => {
           var newUser = {
               
                firstName: firstName,
                lastName: lastName,
                email: email,
                occupation: occupation,
                 _id: uuid.v4(),
                 tasks: []
                
            };
        return userdata.insertOne(newUser).then((newInsertInformation) => {
            return newInsertInformation.insertedId;
                    }).then((newId) => {
                        return this.getUserById(newId);
            });
                
        });
    },

   
   updateUser(id, newdetails)
     {
        return this.getUserById(id).then((userdata) =>
        {
            var updatedetails = {};

            if(newdetails.firstName) 
            {
              updatedetails.firstName = newdetails.firstName;
            }

            if(newdetails.lastName) 
            {
              updatedetails.lastName = newdetails.lastName;
            }

            if(newdetails.email) 
            {
              updatedetails.email = newdetails.email;
            }

            if(newdetails.occupation) 
            {
              updatedetails.occupation = newdetails.occupation;
            }

            var updateCommand =
            {
                 $set: updatedetails
            };

            return userdata.updateOne({_id : id} , updateCommand).then(() =>
            {
                return this.getUserById(id);
            });
        });
     },

      addTaskToUser(id, taskId, taskTitle, creatorName, creatorEmail, description, duedate, creationdate, priority )
    {
        return this.getUserById(id).then((currentUser) => {

            return userdata.updateOne({ _id: id }, {
                $addToSet: {
                    tasks : {
                        id: taskId,
                        title: taskTitle,
                        creator: [
                            {
                                creatorName: creatorName,
                                creatorEmail: creatorEmail,
                                id: id
                                
                            }
                        ],
                        description: description,
                        duedate: duedate,
			            creationdate: creationdate,
			            priority: priority

                    }
                }
            });
        });
    }


}
 
 
>>>>>>> origin/master
module.exports = exportmethods;