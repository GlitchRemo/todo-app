const fs = require("fs");
const request = require("supertest");
const { describe, it } = require("node:test");
const { createApp } = require("../app");
const { TodoLists } = require("../models/todo-lists");
const { TodoList } = require("../models/todo-list");
const { TodoStorage } = require("../todo-storage");

const getTodos = (app, todosData, done) => {
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
			const app = createApp();

			const todoLists = new TodoLists();
			app.todoLists = todoLists;

			request(app)
				.get("/todos")
				.expect(200)
				.expect("content-type", /application\/json/)
				.expect([])
				.end(done);
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
				.end(getTodos(app, todosData, done));
		});
	});

	describe("POST /todo-lists/list_1/todos", () => {
		it("should add a todo", (_, done) => {
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
				.end(getTodos(app, todosData, done));
		});
	});
});
