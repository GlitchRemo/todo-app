class Todos {
  #todos;
  #id;

  constructor() {
    this.#todos = [];
    this.#id = 0;
  }

  #generateId() {
    this.#id++;
    return this.#id;
  }

  addTodo(title) {
    const id = this.#generateId();
    this.#todos.push(new Todo({ id, title }));
  }

  addTask({ todoId, description }) {
    this.#todos.find((todo) => todo.id === todoId).addTask(description);
  }

  removeTask({ todoId, taskId }) {
    this.#todos.find((todo) => todo.id === todoId).deleteTask(taskId);
  }

  markOrUnmarkTask({ todoId, taskId }) {
    this.#todos.find((todo) => todo.id === todoId).markOrUnmarkTask(taskId);
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
