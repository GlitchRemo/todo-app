const { Todo } = require("./todo");

class Todos {
  #todos;
  #todoId;

  constructor() {
    this.#todoId = 0;
    this.#todos = [];
  }

  #generateId() {
    this.#todoId++;
    return this.#todoId;
  }

  addTodo(title) {
    const todoId = this.#generateId();
    this.#todos.push(new Todo({ todoId, title }));
  }

  addTask({ todoId, description }) {
    this.#todos.find((todo) => todo.id === todoId).addTask(description);
  }

  deleteTask({ todoId, taskId }) {
    this.#todos.find((todo) => todo.id === todoId).deleteTask(taskId);
  }

  markOrUnmarkTask({ todoId, taskId, isDone }) {
    this.#todos
      .find((todo) => todo.id === todoId)
      .markOrUnmarkTask(taskId, isDone);
  }

  sortTodoBy(todoId, type) {
    const todo = this.#todos.find((todo) => todo.id === todoId);
    todo.sortTodoBy(type);
  }

  getTodos() {
    return this.#todos;
  }

  getDetails() {
    return this.#todos.map((todo) => todo.getDetails());
  }
}

module.exports = { Todos };
