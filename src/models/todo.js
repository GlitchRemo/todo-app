class Todo {
	#id;
	#isDone;
	#description;

	constructor(description, id, isDone) {
		this.#id = id;
		this.#isDone = isDone || false;
		this.#description = description;
	}

	setStatus(isDone) {
		this.#isDone = isDone;
	}

	get id() {
		return this.#id;
	}

	getDetails() {
		return {
			todoId: this.#id,
			description: this.#description,
			isDone: this.#isDone,
		};
	}
}

module.exports = Todo;
