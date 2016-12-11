const express = require('express');
const router = express.Router();
const data = require("../data");
const taskData = data.list;


router.get("/:id", (req, res) => {
    taskData.getAllTasksForUser(req.params.id).then((taskList) => {
        tasks = taskList.tasks
        var todoTasks = []
        var backupTasks =[]
        var doneTasks = []
        var doingTasks =[]
        var id = taskList._id
        for(var i =0; i < tasks.length; i++){
            if (tasks[i].list == "todo"){
                todoTasks.push(tasks[i])
            }
            if (tasks[i].list == "backup"){
                backupTasks.push(tasks[i])
            }
            if (tasks[i].list == "done"){
                doneTasks.push(tasks[i])
            }
            if (tasks[i].list == "doing"){
                doingTasks.push(tasks[i])
            }
        }
        res.render("list/list",{partial:"userProfile-scripts",taskID:req.params.id,todo:todoTasks, backup:backupTasks, done:doneTasks, doing:doingTasks});
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});

router.get("/calendardata/:id", (req,res) =>{
  taskData.getAllTasksForUser(req.params.id).then((taskList) => {
      res.json(taskList.tasks);
  });
});
router.get("/calendar/:id", (req,res) =>{
            res.render("calendar/MonthlyView",{partial:"MonthlyView-scripts",id:req.params.id});


});
module.exports = router;