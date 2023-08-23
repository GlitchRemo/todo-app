const handlers = require("./handlers");

const createTodoRoutes = (app) => {
  app.get("/todos", handlers.sendTodos);
  app.post("/todos", handlers.addTodoList);
  app.post("/todos/tasks", handlers.addTodo);
  app.patch("/todos/tasks/task", handlers.toggleDoneStatus);
  app.patch("/todos/todo", handlers.sortTodoList);
  app.delete("/todos/tasks", handlers.deleteTodo);
};

module.exports = { createTodoRoutes };
