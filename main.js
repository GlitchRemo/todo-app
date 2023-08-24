const fs = require("node:fs");
const STORAGE_PATH = "./todos.json";

const { TodosStorage } = require("./src/todos-storage");
const { initialize } = require("./src/initializer");
const { createApp } = require("./src/app");

const main = () => {
	const PORT = 8000;
	const app = createApp();

	const todosStorage = new TodosStorage(fs, STORAGE_PATH);
	const todoLists = initialize(todosStorage.readTodos());

	app.todoLists = todoLists;
	app.todosStorage = todosStorage;

	app.listen(PORT, () => console.log("Server is listening on PORT:", PORT));
};

main();
