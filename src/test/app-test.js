const fs = require("fs");
const request = require("supertest");
const { describe, it } = require("node:test");
const { createApp } = require("../app");
const { TodoLists } = require("../models/todo-lists");
const { TodoList } = require("../models/todo-list");
const { TodoStorage } = require("../todo-storage");

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
			const app = createApp();

			const todoList = new TodoList("Office", "list_1");
			const todoLists = new TodoLists([todoList]);
			const todoStorage = new TodoStorage(fs);

			app.todoLists = todoLists;
			app.todoStorage = todoStorage;

			request(app)
				.post("/todos")
				.send({ title: "Personal" })
				.expect(204)
				.end(() => {
					request(app)
						.get("/todos")
						.expect(200)
						.expect("content-type", /application\/json/)
						.expect(todosData)
						.end(done);
				});
		});
	});
});
