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

  #onNewTask({ todoId, description }) {
    this.#todos.addTask({ todoId, description });
    this.#todosStorage.update(this.#todos.getDetails());
    this.#view.render(this.#todos.getDetails());
  }

  #onNewTodo(title) {
    this.#todos.addTodo(title);
    this.#todosStorage.update(this.#todos.getDetails());
    this.#view.render(this.#todos.getDetails());
  }

  #onMarkOrUnmark({ taskId, todoId, isDone }) {
    this.#todos.markOrUnmarkTask({ taskId, todoId, isDone });
    this.#todosStorage.update(this.#todos.getDetails());
    this.#view.render(this.#todos.getDetails());
  }

  #onRemove({ taskId, todoId }) {
    this.#todos.removeTask({ taskId, todoId });
    this.#todosStorage.update(this.#todos.getDetails());
    this.#view.render(this.#todos.getDetails());
  }

  #onAlphabeticSort(todoId) {
    this.#todos.sortTodoBy(todoId, { alphabetic: true });
    this.#todosStorage.update(this.#todos.getDetails());
    this.#view.render(this.#todos.getDetails());
  }

  #onStatusSort(todoId) {
    this.#todos.sortTodoBy(todoId, { status: true });
    this.#todosStorage.update(this.#todos.getDetails());
    this.#view.render(this.#todos.getDetails());
  }

  #onDateSort(todoId) {
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
    this.#inputController.onNewTodo((title) => this.#onNewTodo(title));
    this.#view.on("addTask", (task) => this.#onNewTask(task));
    this.#view.on("markTask", (ids) => this.#onMarkOrUnmark(ids));
    this.#view.on("removeTask", (ids) => this.#onRemove(ids));
    this.#view.on("alphabeticSort", (id) => this.#onAlphabeticSort(id));
    this.#view.on("dateSort", (id) => this.#onDateSort(id));
    this.#view.on("statusSort", (id) => this.#onStatusSort(id));
  }
}
