
var userRoutes = require("./users");

var constructorMethod = (app) => 

{
    app.use("./users", userRoutes);
    app.use("*", (req, res) => 
    {
        res.sendStatus(404);
    })
};

module.exports = constructorMethod;