class TodosController {
  #todos;
  #todosStorage;
  #view;
  #inputController;

  constructor(todos, todosStorage, view, inputController) {
    this.#todos = todos;
    this.#todosStorage = todosStorage;
    this.#view = view;
    this.#inputController = inputController;
  }

  #addTask({ todoId, description }) {
    this.#todos.addTask({ todoId, description });
    this.#todosStorage.update(this.#todos.getDetails());
    this.#view.render(this.#todos.getDetails());
  }

  #addTodo(title) {
    this.#todos.addTodo(title);
    this.#todosStorage.update(this.#todos.getDetails());
    this.#view.render(this.#todos.getDetails());
  }

  #markOrUnmarkTask({ taskId, todoId, isDone }) {
    this.#todos.markOrUnmarkTask({ taskId, todoId, isDone });
    this.#todosStorage.update(this.#todos.getDetails());
    this.#view.render(this.#todos.getDetails());
  }

  #removeTask({ taskId, todoId }) {
    this.#todos.removeTask({ taskId, todoId });
    this.#todosStorage.update(this.#todos.getDetails());
    this.#view.render(this.#todos.getDetails());
  }

  #sortTodoAlphabetically(todoId) {
    this.#todos.sortTodoBy(todoId, { alphabetic: true });
    this.#todosStorage.update(this.#todos.getDetails());
    this.#view.render(this.#todos.getDetails());
  }

  #sortTodoByStatus(todoId) {
    this.#todos.sortTodoBy(todoId, { status: true });
    this.#todosStorage.update(this.#todos.getDetails());
    this.#view.render(this.#todos.getDetails());
  }

  #sortTodoByDate(todoId) {
    this.#todos.sortTodoBy(todoId, { date: true });
    this.#todosStorage.update(this.#todos.getDetails());
    this.#view.render(this.#todos.getDetails());
  }

  #createTodo({ todoId, tasks, title, sortBy }) {
    this.#todos.addTodo(title);
    this.#todos.sortTodoBy(todoId, sortBy);

    tasks.forEach(({ taskId, description, isDone }) => {
      this.#todos.addTask({ todoId, description });
      this.#todos.markOrUnmarkTask({ taskId, todoId, isDone });
    });
  }

  #reloadTodos() {
    const todos = this.#todosStorage.fetch();
    todos.forEach((todo) => this.#createTodo(todo));
    this.#view.render(this.#todos.getDetails());
  }

  start() {
    this.#reloadTodos();
    this.#inputController.onNewTodo((title) => this.#addTodo(title));
    this.#view.on("addTask", (task) => this.#addTask(task));
    this.#view.on("markTask", (ids) => this.#markOrUnmarkTask(ids));
    this.#view.on("removeTask", (ids) => this.#removeTask(ids));
    this.#view.on("alphabeticSort", (id) => this.#sortTodoAlphabetically(id));
    this.#view.on("dateSort", (id) => this.#sortTodoByDate(id));
    this.#view.on("statusSort", (id) => this.#sortTodoByStatus(id));
  }
}
