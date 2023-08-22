const handlers = require("./handlers");

const logRequest = (request, response, next) => {
  console.log(">", request.method, request.url);
  next();
};

const createRouter = (app, todosController) => {
  app.use((req, res, next) => {
    req.todosController = todosController;
    next();
  });

  app.use(logRequest);
  app.get("/", handlers.redirectToHomepage);
  app.get("/todos", handlers.sendTodos);
  app.post("/todos", handlers.addTodoList);
  app.post("/todos/tasks", handlers.addTodo);
  app.patch("/todos/tasks/task", handlers.toggleDoneStatus);
  app.patch("/todos/todo", handlers.sortTodoList);
  app.delete("/todos/tasks", handlers.deleteTodo);
  app.use(handlers.serveStaticPage);
};

module.exports = { createRouter };
