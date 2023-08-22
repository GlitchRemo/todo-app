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

  #addTask(listId, description) {
    fetch("/todos/tasks", {
      method: "POST",
      body: JSON.stringify({ description, listId }),
      headers: {
        "Content-type": "application/json",
      },
    }).then(() => this.fetchTodos());
  }

  #markOrUnmarkTask(todoId, taskId, isDone) {
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

  #removeTask(listId, todoId) {
    fetch("/todos/tasks", {
      method: "DELETE",
      body: JSON.stringify({ todoId, listId }),
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

    this.#view.on("addTask", (listId, description) =>
      this.#addTask(listId, description)
    );
    this.#view.on("markTask", (listId, todoId, isDone) =>
      this.#markOrUnmarkTask(listId, todoId, isDone)
    );
    this.#view.on("removeTask", (listId, todoId) =>
      this.#removeTask(listId, todoId)
    );
    this.#view.on("sort", (listId, type) => this.#updateSort(listId, type));
  }
}
