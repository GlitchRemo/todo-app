const { describe, it } = require("node:test");
const assert = require("assert");
const Todo = require("../models/todo");

describe("Todo", () => {
	describe("setStatus", () => {
		it("should set the done status of a todo as specified", () => {
			const todoId = "todo_1";
			const description = "buy milk";
			const isDone = true;

			const todo = new Todo(description, todoId);
			todo.setStatus(isDone);

			const todoDetails = { todoId, description, isDone };

			assert.deepStrictEqual(todo.getDetails(), todoDetails);
		});
	});

	describe("id", () => {
		it("should give the id of a todo", () => {
			const todoId = "todo_1";

			const todo = new Todo("", todoId);

			assert.strictEqual(todo.id, todoId);
		});
	});

	describe("getDetails", () => {
		it("should give the id of a todo", () => {
			const todoId = "todo_1";
			const description = "Buy milk";

			const todo = new Todo(description, todoId);
			const todoDetails = { todoId, description, isDone: false };

			assert.deepStrictEqual(todo.getDetails(), todoDetails);
		});
	});
});
