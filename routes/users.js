

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