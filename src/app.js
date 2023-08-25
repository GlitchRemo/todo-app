const express = require("express");
const { createTodoRoutes } = require("./router/todo-routes");
const { logRequest } = require("./middlewares/logger");

const createApp = () => {
	const app = express();

	app.use(express.json());
	app.use(express.urlencoded());
	app.use(logRequest);

	createTodoRoutes(app);

	app.use(express.static("public"));

	return app;
};

module.exports = { createApp };
