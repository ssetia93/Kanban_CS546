
var express = require('express');
var router = express.Router();
var data = require("../data");
var userData = data.users;

router.get("/users", (req, res) => {
    userData.getAllUsers().then((userList) => {
        res.json(userList);
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});

router.get("/:id", (req, res) => {
    userData.getUserById(req.params.id).then((user) => {
        res.json(user);
    }).catch(() => {
        res.status(404).json({ error: "Recipe not found" });
    });
});

router.post("/createuser", (req, res) => {
    var newuserData = req.body; // getting the request body from the post data 

    userData.addUser(newuserData.firstname, newuserData.lastname, newuserData.email, newuserData.occupation)
        .then((newUser) => {
            res.json(newUser);
        }).catch((e) => {
            res.status(500).json({ error: e });
        });
});

module.exports = router;