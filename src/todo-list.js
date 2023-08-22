const { Todo } = require("./todo");

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
    return this.#todoCount;
  }

  sortTodoBy(type) {
    this.#sortBy = type;
  }

  addTask(description, isDone) {
    const taskId = this.#generateId();
    const task = new Todo(description, taskId, isDone);
    this.#todos.push(task);
  }

  markOrUnmarkTask(id, isDone) {
    this.#todos.find((task) => task.id === id).setStatus(isDone);
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

  deleteTask(id) {
    const indexOfTaskToDelete = this.#todos.findIndex((task) => task.id === id);
    this.#todos.splice(indexOfTaskToDelete, 1);
  }

  getDetails() {
    const todos = this.#todos.map((task) => task.getDetails());
    return {
      listId: this.#listId,
      title: this.#title,
      sortBy: this.#sortBy,
      todos,
    };
  }
}

module.exports = { TodoList };
