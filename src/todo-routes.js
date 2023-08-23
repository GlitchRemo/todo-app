const handlers = require("./handlers");

const createTodoRoutes = (app) => {
  app.get("/todos", handlers.sendTodos);

  app.post("/todos", handlers.addTodoList);
  app.post("/todoLists/:listId/todos", handlers.addTodo);

  app.patch(`/todoLists/:listId/todos/:todoId`, handlers.toggleDoneStatus);
  app.patch("/todoLists/:listId", handlers.sortTodoList);

  app.delete("/todoLists/:listId/todos/:todoId", handlers.deleteTodo);
};

module.exports = { createTodoRoutes };
