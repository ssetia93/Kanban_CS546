
var userRoutes = require("./users");
var taskRoutes = require("./taskList");

var constructorMethod = (app) => 

{
    app.use("/users", userRoutes);
    app.use("/taskList", taskRoutes);
    
    app.use("*", (req, res) => 
    {
        res.sendStatus(404);
    })
};

module.exports = constructorMethod;