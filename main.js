const fs = require("node:fs");
const STORAGE_PATH = "./todos.json";

const { TodosController } = require("./src/todos-controller");
const { TodosStorage } = require("./src/todos-storage");
const { initialize } = require("./src/initializer");
const { createApp } = require("./src/app");

const main = () => {
  const PORT = 8000;
  const app = createApp();

  const todosStorage = new TodosStorage(fs, STORAGE_PATH);
  const todoLists = initialize(todosStorage.readTodos());
  const todosController = new TodosController(todoLists, todosStorage);

  app.todosController = todosController;
  app.listen(PORT, () => console.log("Server is listening to PORT:", PORT));
};

main();
