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
<<<<<<< HEAD

   updateUser(id, newdetails)
     {
        return users().then((userdata) =>
        {
            var updatedetails = {};

            if(newdetails.firstname) 
            {
              updatedetails.firstname = newdetails.firstname;
            }

            if(newdetails.lastname) 
            {
              updatedetails.lastname = newdetails.lastname;
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

            return userdata.updateOne({_id : id} , updateCommand).then((result) =>
            {
                return this.getUserById(id);
            });
        });
     }
=======
>>>>>>> parent of e031ff4... commit
}
 
 
module.exports = exportmethods;