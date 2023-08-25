const request = require("supertest");
const { describe, it } = require("node:test");
const { createApp } = require("../app");
const { TodoLists } = require("../models/todo-lists");

describe("App", () => {
	describe("GET /todos", () => {
		it("should send no todo initially", (_, done) => {
			const todoLists = new TodoLists();
			const app = createApp();
			app.todoLists = todoLists;

			request(app)
				.get("/todos")
				.expect(200)
				.expect("content-type", /application\/json/)
				.expect([])
				.end(done);
		});
	});
});
