const taskRoutes = require("./taskList");

const constructorMethod = (app) => {
    app.use("/taskList", taskRoutes);

    app.use("*", (req, res) => {
        res.status(404).json({error: "Not found"});
    });
};

module.exports = constructorMethod;