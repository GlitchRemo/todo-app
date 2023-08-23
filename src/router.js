const fs = require("node:fs");
const { TodosController, initialize } = require("./todos-controller");
const { TodosStorage } = require("./todos-storage");
const handlers = require("./handlers");

const logRequest = (request, response, next) => {
  console.log(">", request.method, request.url);
  next();
};

const attachController = (request, response, next) => {
  const storagePath = "./todos.json";
  const todosStorage = new TodosStorage(fs, storagePath);
  const todoLists = initialize(todosStorage.readTodos());
  const todosController = new TodosController(todoLists, todosStorage);

  request.todosController = todosController;
  next();
};

const readBody = (request, response, next) => {
  let body = "";

  request.on("data", (chunk) => {
    body += chunk;
  });

  request.on("end", () => {
    console.log("body", body);
    request.body = JSON.parse(body);
    next();
  });
};

const createRouter = (app) => {
  app.use(logRequest);
  app.use(attachController);

  app.get("/", handlers.redirectToHomepage);
  app.get("/todos", handlers.sendTodos);
  app.post("/todos", readBody, handlers.addTodoList);
  app.post("/todos/tasks", readBody, handlers.addTodo);
  app.patch("/todos/tasks/task", readBody, handlers.toggleDoneStatus);
  app.patch("/todos/todo", readBody, handlers.sortTodoList);
  app.delete("/todos/tasks", readBody, handlers.deleteTodo);
  app.get(/.*/, handlers.serveStaticPage);
};

module.exports = { createRouter };
