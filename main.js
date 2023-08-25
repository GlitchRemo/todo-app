const fs = require("node:fs");
const STORAGE_PATH = "./todos.json";

const { TodoStorage } = require("./src/todo-storage");
const { initialize } = require("./src/initializer");
const { createApp } = require("./src/app");

const main = () => {
	const PORT = 8000;
	const app = createApp();

	const todoStorage = new TodoStorage(fs, STORAGE_PATH);
	const todoLists = initialize(todoStorage.readTodos());

	app.todoLists = todoLists;
	app.todoStorage = todoStorage;

	app.listen(PORT, () => console.log("Server is listening on PORT:", PORT));
};

main();
