const fs = require("node:fs");
const http = require("node:http");
const { createRouter } = require("./src/router");
const { TodosController, initialize } = require("./src/todos-controller");
const { TodosStorage } = require("./src/todos-storage");
const { TodoLists } = require("./src/todo-lists");

const logRequest = (request) => console.log(">", request.method, request.url);

const setupServer = (todosController) => {
  const router = createRouter();

  const server = http.createServer((req, res) => {
    logRequest(req);
    req.todosController = todosController;

    router.route(req, res);
  });

  const PORT = 8000;
  server.listen(PORT, () => console.log("Server is listening to PORT:", PORT));
};

const main = () => {
  const storagePath = "./todos.json";
  const todosStorage = new TodosStorage(fs, storagePath);
  const todoLists = initialize(todosStorage.readTodos());
  const todosController = new TodosController(todoLists, todosStorage);

  setupServer(todosController);
};

main();
