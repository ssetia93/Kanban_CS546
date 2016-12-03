
const express = require('express');
const router = express.Router();
const data = require("../data");
const taskData = data.list;


router.get("/:id", (req, res) => {
	//const userId = user._id;
    taskData.getAllTasksForUser(req.params.id).then((taskList) => {
        res.json(taskList);
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});
