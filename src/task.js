class Task {
  #description;
  #id;
  #isDone;

  constructor(description, id, isDone) {
    this.#description = description;
    this.#id = id;
    this.#isDone = isDone || false;
  }

  setStatus(isDone) {
    this.#isDone = isDone;
  }

  isDone() {
    return this.#isDone;
  }

  get description() {
    return this.#description;
  }

  get id() {
    return this.#id;
  }

  getDetails() {
    return {
      taskId: this.#id,
      description: this.description,
      isDone: this.#isDone,
    };
  }
}

module.exports = { Task };
