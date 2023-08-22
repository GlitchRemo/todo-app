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

  addTodo(title, sortBy) {
    const todoId = this.#generateId();
    this.#todos.push(new Todo({ todoId, title, sortBy }));
  }

  addTask({ todoId, description, isDone }) {
    this.#todos.find((todo) => todo.id === todoId).addTask(description, isDone);
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

  getDetails() {
    return this.#todos.map((todo) => todo.getDetails());
  }
}

module.exports = { Todos };
