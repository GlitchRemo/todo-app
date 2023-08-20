class Todos {
  #todos;

  constructor() {
    this.#todos = [];
  }

  addTodo(title, todoId) {
    this.#todos.push(new Todo({ todoId, title }));
  }

  addTask({ todoId, description, taskId }) {
    this.#todos.find((todo) => todo.id === todoId).addTask(description, taskId);
  }

  removeTask({ todoId, taskId }) {
    this.#todos.find((todo) => todo.id === todoId).deleteTask(taskId);
  }

  markOrUnmarkTask({ todoId, taskId, isDone }) {
    this.#todos
      .find((todo) => todo.id === todoId)
      .markOrUnmarkTask(taskId, isDone);
  }

  sortTodoBy(todoId, { alphabetic, status, date }) {
    const todo = this.#todos.find((todo) => todo.id === todoId);
    todo.sortTodoBy({ alphabetic, date, status });
  }

  getTodos() {
    return this.#todos;
  }

  getDetails() {
    return this.#todos.map((todo) => todo.getDetails());
  }
}
