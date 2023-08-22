const { Task } = require("./task");

class Todo {
  #tasks;
  #todoId;
  #taskId;
  #sortBy;
  #title;

  constructor({ title, todoId, sortBy }) {
    this.#title = title;
    this.#todoId = todoId;
    this.#taskId = 0;
    this.#tasks = [];
    this.#sortBy = sortBy || { alphabetic: false, date: true, status: false };
  }

  #generateId() {
    this.#taskId++;
    return this.#taskId;
  }

  sortTodoBy(type) {
    this.#sortBy = type;
  }

  addTask(description, isDone) {
    const taskId = this.#generateId();
    const task = new Task(description, taskId, isDone);
    this.#tasks.push(task);
  }

  markOrUnmarkTask(id, isDone) {
    this.#tasks.find((task) => task.id === id).setStatus(isDone);
  }

  get title() {
    return this.#title;
  }

  get id() {
    return this.#todoId;
  }

  get sortBy() {
    return this.#sortBy;
  }

  deleteTask(id) {
    const indexOfTaskToDelete = this.#tasks.findIndex((task) => task.id === id);
    this.#tasks.splice(indexOfTaskToDelete, 1);
  }

  getDetails() {
    const tasks = this.#tasks.map((task) => task.getDetails());
    return {
      todoId: this.#todoId,
      title: this.#title,
      sortBy: this.#sortBy,
      tasks,
    };
  }
}

module.exports = { Todo };
