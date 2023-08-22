const fs = require("node:fs");
const express = require("express");
const { createRouter } = require("./src/router");
const { TodosController, initialize } = require("./src/todos-controller");
const { TodosStorage } = require("./src/todos-storage");

const setupServer = (todosController) => {
  const app = express();

  const PORT = 8000;
  app.listen(PORT, () => console.log("Server is listening to PORT:", PORT));

  createRouter(app, todosController);
};

const main = () => {
  const storagePath = "./todos.json";
  const todosStorage = new TodosStorage(fs, storagePath);
  const todoLists = initialize(todosStorage.readTodos());
  const todosController = new TodosController(todoLists, todosStorage);

  setupServer(todosController);
};

main();
