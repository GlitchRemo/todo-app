class TodosController {
  #todos;
  #view;
  #inputController;

  constructor(todos, view, inputController) {
    this.#todos = todos;
    this.#view = view;
    this.#inputController = inputController;
  }

  #onNewTask({ todoId, description }) {
    this.#todos.addTask({ todoId, description });
    this.#view.render(this.#todos.getTodos());
  }

  #onNewTodo(title) {
    this.#todos.addTodo(title);
    this.#view.render(this.#todos.getTodos());
  }

  #onMarkOrUnmark({ taskId, todoId }) {
    this.#todos.markOrUnmarkTask({ taskId, todoId });
    this.#view.render(this.#todos.getTodos());
  }

  #onRemove({ taskId, todoId }) {
    this.#todos.removeTask({ taskId, todoId });
    this.#view.render(this.#todos.getTodos());
  }

  #onAlphabeticSort(todoId) {
    this.#todos.sortTodoBy(todoId, { alphabetic: true });
    this.#view.render(this.#todos.getTodos());
  }

  #onStatusSort(todoId) {
    this.#todos.sortTodoBy(todoId, { status: true });
    this.#view.render(this.#todos.getTodos());
  }

  #onDateSort(todoId) {
    this.#todos.sortTodoBy(todoId, { date: true });
    this.#view.render(this.#todos.getTodos());
  }

  start() {
    this.#inputController.onNewTodo((title) => this.#onNewTodo(title));
    this.#view.on("addTask", (task) => this.#onNewTask(task));
    this.#view.on("markTask", (ids) => this.#onMarkOrUnmark(ids));
    this.#view.on("removeTask", (ids) => this.#onRemove(ids));
    this.#view.on("alphabeticSort", (id) => this.#onAlphabeticSort(id));
    this.#view.on("dateSort", (id) => this.#onDateSort(id));
    this.#view.on("statusSort", (id) => this.#onStatusSort(id));
  }
}
