<<<<<<< HEAD

var express = require('express');
var router = express.Router();
var data = require("../data");
var userData = data.users;


router.get("/:id", (req, res) => {
    userData.getUserById(req.params.id).then((user) => {
        res.json(user);
    }).catch(() => {
        res.status(404).json({ error: "User not found" });
    });
});



router.get("/", (req, res) => {
    userData.getAllUsers().then((userList) => {
        res.json(userList);
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});


router.post("/", (req, res) => {
    
    var newuserData = req.body; // getting the request body from the post data 

     if (!newuserData[0]) {
        res.status(400).json({ error: "You must provide data to create a user" });
        return;
    }

    if (!newuserData[0].firstName) {
        res.status(400).json({ error: "You must provide a first name" });
        return;
    }

    if (!newuserData[0].lastName) {
        res.status(400).json({ error: "You must provide a last name" });
        return;
    }

    if (!newuserData[0].email) {
        res.status(400).json({ error: "You must provide a valid email id" });
        return;
    }

    if (!newuserData[0].occupation) {
        res.status(400).json({ error: "You must provide a valid occupation detail" });
        return;
    }
    

    userData.addUser(newuserData[0].firstName, newuserData[0].lastName, newuserData[0].email, newuserData[0].occupation)
        .then((newUser) => {
            res.json(newUser);
        },() => {
            res.sendStatus(500);
        });
});

module.exports = router;
/*
{
  "_id": "6c233431-4334-44fa-80f1-d802cdc1f58a",
  "taskTitle": "Install Oracle Database",
  "creator": [
    {
      "creatorName": "Oliver Twist",
      "creatorEmail": "olive@xyz.com",
      "id": "312e7da5-8e53-4809-b946-d3f8c6f2fa1c"
    }
  ],
  "description": "We will be using the Oracle 11g database.",
  "duedate": "12/31/2016",
  "creationdate": "11/18/2016",
  "priority": "low"
}

0adead20-a418-4990-99f6-17aa64bf83e7
*/
=======
var express = require('express');
var router = express.Router();
var data = require("../data");
var userData = data.users;


router.get("/:id", (req, res) => {
    userData.getUserById(req.params.id).then((user) => {
        res.json(user);
    }).catch(() => {
        res.status(404).json({ error: "User not found" });
    });
});



router.get("/", (req, res) => {
    userData.getAllUsers().then((userList) => {
        res.json(userList);
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});


router.post("/", (req, res) => {
    
    var newuserData = req.body; // getting the request body from the post data 

     if (!newuserData) {
        res.status(400).json({ error: "You must provide data to create a user" });
        return;
    }

    if (!newuserData.firstName) {
        res.status(400).json({ error: "You must provide a first name" });
        return;
    }

    if (!newuserData.lastName) {
        res.status(400).json({ error: "You must provide a last name" });
        return;
    }

    if (!newuserData.email) {
        res.status(400).json({ error: "You must provide a valid email id" });
        return;
    }

    if (!newuserData.occupation) {
        res.status(400).json({ error: "You must provide a valid occupation detail" });
        return;
    }
    

    userData.addUser(newuserData.firstName, newuserData.lastName, newuserData.email, newuserData.occupation)
        .then((newUser) => {
            res.json(newUser);
        }).catch((e) => {
            res.status(500).json({ error: e });
        });
});

module.exports = router;
>>>>>>> origin/master
