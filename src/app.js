const express = require("express");
const { createTodoRoutes } = require("./todo-routes");

const logRequest = (request, response, next) => {
  console.log(">", request.method, request.url);
  next();
};

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
