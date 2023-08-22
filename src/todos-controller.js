class TodosController {
  #todos;
  #todosStorage;

  constructor(todos, todosStorage) {
    this.#todos = todos;
    this.#todosStorage = todosStorage;
  }

  addTodo(title, onSave) {
    this.#todos.addTodo(title);
    this.#todosStorage.saveTodos(this.#todos.getDetails(), onSave);
  }

  addTask({ todoId, description }, onSave) {
    this.#todos.addTask({ todoId, description });
    this.#todosStorage.saveTodos(this.#todos.getDetails(), onSave);
  }

  markOrUnmarkTask({ todoId, taskId, isDone }, onSave) {
    this.#todos.markOrUnmarkTask({ todoId, taskId, isDone });
    this.#todosStorage.saveTodos(this.#todos.getDetails(), onSave);
  }

  deleteTask({ todoId, taskId }, onSave) {
    this.#todos.deleteTask({ todoId, taskId });
    this.#todosStorage.saveTodos(this.#todos.getDetails(), onSave);
  }

  updateSort({ todoId, type }, onSave) {
    this.#todos.sortTodoBy(todoId, type);
    this.#todosStorage.saveTodos(this.#todos.getDetails(), onSave);
  }

  getTodos() {
    return this.#todos.getDetails();
  }

  #createTodo({ todoId, title, tasks }) {
    this.#todos.addTodo(title);

    tasks.forEach(({ description }) =>
      this.#todos.addTask({ todoId, description })
    );
  }

  #createTodos() {
    const todos = this.#todosStorage.readTodos();
    todos.forEach((todo) => this.#createTodo(todo));
  }

  start() {
    this.#createTodos();
  }
}

module.exports = { TodosController };
