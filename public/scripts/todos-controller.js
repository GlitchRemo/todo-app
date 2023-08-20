class TodosController {
  #todos;
  #databaseService;
  #view;
  #inputController;

  constructor(todos, databaseService, view, inputController) {
    this.#todos = todos;
    this.#databaseService = databaseService;
    this.#view = view;
    this.#inputController = inputController;
  }

  #getTaskId(todoId) {
    const todo = this.#todos.getTodos().find((todo) => todo.id === todoId);
    return todo.getTasks().length + 1;
  }

  #addTask({ todoId, description }) {
    const taskId = this.#getTaskId(todoId);
    this.#todos.addTask({ todoId, description, taskId });

    this.#databaseService.update(this.#todos.getDetails());

    this.#view.render(this.#todos.getDetails());
  }

  #addTodo(title) {
    this.#databaseService.addTodo(title, (todoDetails) => {
      this.#view.render(todoDetails);
    });
  }

  #markOrUnmarkTask({ taskId, todoId, isDone }) {
    this.#todos.markOrUnmarkTask({ taskId, todoId, isDone });
    this.#databaseService.update(this.#todos.getDetails());
    this.#view.render(this.#todos.getDetails());
  }

  #removeTask({ taskId, todoId }) {
    this.#todos.removeTask({ taskId, todoId });
    this.#databaseService.update(this.#todos.getDetails());
    this.#view.render(this.#todos.getDetails());
  }

  #sortTodoAlphabetically(todoId) {
    this.#todos.sortTodoBy(todoId, { alphabetic: true });
    this.#view.render(this.#todos.getDetails());
  }

  #sortTodoByStatus(todoId) {
    this.#todos.sortTodoBy(todoId, { status: true });
    this.#view.render(this.#todos.getDetails());
  }

  #sortTodoByDate(todoId) {
    this.#todos.sortTodoBy(todoId, { date: true });
    this.#view.render(this.#todos.getDetails());
  }

  #createTodo({ todoId, tasks, title }) {
    this.#todos.addTodo(title, todoId);

    tasks.forEach(({ taskId, description, isDone }) => {
      this.#todos.addTask({ todoId, description, taskId });
      this.#todos.markOrUnmarkTask({ taskId, todoId, isDone });
    });
  }

  #reloadTodos() {
    this.#databaseService.fetchTodos((todos) => {
      todos.forEach((todo) => this.#createTodo(todo));
      this.#view.render(this.#todos.getDetails());
    });
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
