const request = require("supertest");
const { describe, it } = require("node:test");
const { createApp } = require("../app");
const { TodoLists } = require("../models/todo-lists");
const { TodoList } = require("../models/todo-list");
const { TodoStorage } = require("../todo-storage");

const fs = {
	writeFile: (filePath, content, onSave) => onSave(),
};

const testGetTodos = (app, todosData, done) => {
	return () => {
		request(app)
			.get("/todos")
			.expect(200)
			.expect("content-type", /application\/json/)
			.expect(todosData)
			.end(done);
	};
};

describe("App", () => {
	describe("GET /todos", () => {
		it("should send no todo initially", (_, done) => {
			const todoLists = new TodoLists();
			const app = createApp(todoLists);

			testGetTodos(app, [], done)();
		});

		it("should send all the todos", (_, done) => {
			const todosData = [
				{
					listId: "list_1",
					title: "Office",
					sortBy: { alphabetic: false, date: true, status: false },
					todos: [],
				},
			];

			const app = createApp();

			const todoList = new TodoList("Office", "list_1");
			const todoLists = new TodoLists([todoList]);

			app.todoLists = todoLists;

			request(app)
				.get("/todos")
				.expect(200)
				.expect("content-type", /application\/json/)
				.expect(todosData)
				.end(done);
		});
	});

	describe("POST /todos", () => {
		it("should add a todo", (_, done) => {
			const todosData = [
				{
					listId: "list_1",
					title: "Office",
					sortBy: { alphabetic: false, date: true, status: false },
					todos: [],
				},
				{
					listId: "list_2",
					title: "Personal",
					sortBy: { alphabetic: false, date: true, status: false },
					todos: [],
				},
			];

			const todoList = new TodoList("Office", "list_1");
			const todoLists = new TodoLists([todoList]);
			const todoStorage = new TodoStorage(fs);

			const app = createApp(todoLists, todoStorage);

			request(app)
				.post("/todos")
				.send({ title: "Personal" })
				.expect(204)
				.end(testGetTodos(app, todosData, done));
		});
	});

	describe("POST /todo-lists/list_1/todos", () => {
		it("should add a todo to list_1", (_, done) => {
			const todosData = [
				{
					listId: "list_1",
					title: "Office",
					sortBy: { alphabetic: false, date: true, status: false },
					todos: [
						{ todoId: "todo_1", description: "Review Code", isDone: false },
					],
				},
			];

			const todoList = new TodoList("Office", "list_1");
			const todoLists = new TodoLists([todoList]);
			const todoStorage = new TodoStorage(fs);

			const app = createApp(todoLists, todoStorage);

			request(app)
				.post("/todo-lists/list_1/todos")
				.send({ description: "Review Code" })
				.expect(204)
				.end(testGetTodos(app, todosData, done));
		});
	});

	describe("PATCH /todo-lists/list_1/todos/todo_1", () => {
		it("should set done status of a todo_1 of list_1", (_, done) => {
			const listId = "list_1";
			const todoId = "todo_1";
			const title = "Office";
			const description = "Review Code";
			const isDone = true;

			const todosData = [
				{
					listId,
					title,
					sortBy: { alphabetic: false, date: true, status: false },
					todos: [{ todoId, description, isDone }],
				},
			];

			const todoList = new TodoList(title, listId);
			const todoLists = new TodoLists([todoList]);
			const todoStorage = new TodoStorage(fs);

			todoLists.addTodo({ listId, description });
			todoLists.toggleDoneStatus({ todoId, listId, isDone });

			const app = createApp(todoLists, todoStorage);

			request(app)
				.patch(`/todo-lists/${listId}/todos/${todoId}`)
				.send({ isDone })
				.expect(204)
				.end(testGetTodos(app, todosData, done));
		});
	});
});
