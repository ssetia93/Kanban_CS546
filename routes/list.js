const express = require('express');
const router = express.Router();
const data = require("../data");
const taskData = data.list;


router.get("/:id/:list", (req, res) => {
    taskData.getAllTasksForUser(req.params.id, req.params.list).then((taskList) => {
        res.json(taskList);
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});

module.exports = router;