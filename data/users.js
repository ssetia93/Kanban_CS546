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

  addUser(firstname,lastname,email,occupation)
   {
        return users().then((userdata) => {
           var newUser = {
                _id: uuid.v4(),
                firstname: firstname,
                lastname: lastname,
                email: email,
                occupation: occupation
                
            };
        return userdata.insertOne(newUser).then((newInsertInformation) => {
            return newInsertInformation.insertedId;
                    }).then((newId) => {
                        return this.getUserByIdById(newId);
            });
                
        });
    },
}
 
 
module.exports = exportmethods;