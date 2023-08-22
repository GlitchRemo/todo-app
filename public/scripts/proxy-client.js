class ProxyClient {
  #view;

  constructor(view) {
    this.#view = view;
  }

  fetchTodos() {
    fetch("/todos")
      .then((res) => res.json())
      .then((todosData) => initialize(todosData))
      .then((todoLists) => this.#view.render(todoLists.todosData));
  }

  #addTodo(title) {
    fetch("/todos", {
      method: "post",
      body: JSON.stringify({ title }),
      headers: {
        "Content-type": "application/json",
      },
    }).then(() => this.fetchTodos());
  }

  #addTask({ todoId, description }) {
    fetch("/todos/tasks", {
      method: "POST",
      body: JSON.stringify({ description, todoId }),
      headers: {
        "Content-type": "application/json",
      },
    }).then(() => this.fetchTodos());
  }

  #markOrUnmarkTask({ todoId, taskId, isDone }) {
    fetch("/todos/tasks/task", {
      method: "PATCH",
      body: JSON.stringify({ todoId, taskId, isDone }),
      headers: {
        "Content-type": "application/json",
      },
    }).then(() => {
      this.fetchTodos();
    });
  }

  #removeTask({ todoId, taskId }) {
    fetch("/todos/tasks", {
      method: "DELETE",
      body: JSON.stringify({ todoId, taskId }),
      headers: {
        "Content-type": "application/json",
      },
    }).then(() => {
      this.fetchTodos();
    });
  }

  #updateSort(todoId, type) {
    fetch("/todos/todo", {
      method: "PATCH",
      body: JSON.stringify({ todoId, type }),
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => this.fetchTodos());
  }

  start() {
    this.fetchTodos();

    this.#view.onNewTodo((title) => this.#addTodo(title));

    this.#view.on("addTask", (task) => this.#addTask(task));
    this.#view.on("markTask", (ids) => this.#markOrUnmarkTask(ids));
    this.#view.on("removeTask", (ids) => this.#removeTask(ids));
    this.#view.on("sort", (id, type) => this.#updateSort(id, type));
  }
}
