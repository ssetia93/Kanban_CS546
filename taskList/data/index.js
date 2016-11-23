const taskRoutes = require("./taskList");

const constructorMethod = (app) => {
    app.use("/taskList", taskRoutes);
};

module.exports = {
	taskList: require("./taskList")
};