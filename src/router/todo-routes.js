const handlers = require("../handlers/todo-handlers");

const createTodoRoutes = (app) => {
	app.get("/todos", handlers.sendTodos);

	app.post("/todos", handlers.addTodoList);
	app.post("/todo-lists/:listId/todos", handlers.addTodo);

	app.patch("/todo-lists/:listId/todos/:todoId", handlers.toggleDoneStatus);
	app.patch("/todo-lists/:listId", handlers.sortTodoList);

	app.delete("/todo-lists/:listId/todos/:todoId", handlers.deleteTodo);
};

module.exports = { createTodoRoutes };
