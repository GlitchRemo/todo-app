const Todo = require("./todo");

class TodoList {
	#todos;
	#listId;
	#todoCount;
	#sortBy;
	#title;

	constructor(title, listId, sortBy) {
		this.#todos = [];
		this.#title = title;
		this.#todoCount = 0;
		this.#listId = listId;
		this.#sortBy = sortBy || { alphabetic: false, date: true, status: false };
	}

	#generateId() {
		this.#todoCount++;
		return `todo_${this.#todoCount}`;
	}

	sortListBy(type) {
		this.#sortBy = type;
	}

	add(description, isDone) {
		const todoId = this.#generateId();
		const todo = new Todo(description, todoId, isDone);
		this.#todos.push(todo);
	}

	toggleDoneStatus(id, isDone) {
		this.#todos.find((todo) => todo.id === id).setStatus(isDone);
	}

	get title() {
		return this.#title;
	}

	get id() {
		return this.#listId;
	}

	get sortBy() {
		return this.#sortBy;
	}

	delete(id) {
		const indexOfTodoToDelete = this.#todos.findIndex((todo) => todo.id === id);
		this.#todos.splice(indexOfTodoToDelete, 1);
	}

	getDetails() {
		const todos = this.#todos.map((todo) => todo.getDetails());

		return {
			listId: this.#listId,
			title: this.#title,
			sortBy: this.#sortBy,
			todos,
		};
	}
}

module.exports = { TodoList };
