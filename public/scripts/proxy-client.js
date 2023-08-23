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
    const url = `/todoLists/:${listId}/todos`;

    fetch(url, {
      method: "POST",
      body: JSON.stringify({ description, listId }),
      headers: {
        "Content-type": "application/json",
      },
    }).then(() => this.fetchTodos());
  }

  #markOrUnmarkTask(listId, todoId, isDone) {
    const url = `/todoLists/:${listId}/todos/${todoId}`;

    fetch(url, {
      method: "PATCH",
      body: JSON.stringify({ listId, todoId, isDone }),
      headers: {
        "Content-type": "application/json",
      },
    }).then(() => {
      this.fetchTodos();
    });
  }

  #removeTask(listId, todoId) {
    const url = `/todoLists/:${listId}/todos/${todoId}`;

    fetch(url, {
      method: "DELETE",
      body: JSON.stringify({ todoId, listId }),
      headers: {
        "Content-type": "application/json",
      },
    }).then(() => {
      this.fetchTodos();
    });
  }

  #updateSort(listId, type) {
    const url = `/todoLists/:${listId}`;

    fetch(url, {
      method: "PATCH",
      body: JSON.stringify({ listId, type }),
      headers: {
        "Content-type": "application/json",
      },
    }).then(() => this.fetchTodos());
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
