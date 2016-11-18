const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const uuid = require('node-uuid');

var exportmethods
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
 }

 
module.exports = exportmethods;