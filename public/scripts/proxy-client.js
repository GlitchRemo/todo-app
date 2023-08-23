class ProxyClient {
  #view;

  constructor(view) {
    this.#view = view;
  }

  #fetchTodosAndRender() {
    fetch("/todos")
      .then((res) => res.json())
      .then((todosData) => initialize(todosData))
      .then((todoLists) => this.#view.render(todoLists.todosData));
  }

  #addList(title) {
    fetch("/todos", {
      method: "post",
      body: JSON.stringify({ title }),
      headers: {
        "Content-type": "application/json",
      },
    }).then(() => this.#fetchTodosAndRender());
  }

  #addTodo(listId, description) {
    const url = `/todoLists/${listId}/todos`;

    fetch(url, {
      method: "POST",
      body: JSON.stringify({ description }),
      headers: {
        "Content-type": "application/json",
      },
    }).then(() => this.#fetchTodosAndRender());
  }

  #toggleDoneStatus(listId, todoId, isDone) {
    const url = `/todoLists/${listId}/todos/${todoId}`;

    fetch(url, {
      method: "PATCH",
      body: JSON.stringify({ isDone }),
      headers: {
        "Content-type": "application/json",
      },
    }).then(() => {
      this.#fetchTodosAndRender();
    });
  }

  #removeTodo(listId, todoId) {
    const url = `/todoLists/${listId}/todos/${todoId}`;

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    }).then(() => {
      this.#fetchTodosAndRender();
    });
  }

  #updateSort(listId, type) {
    const url = `/todoLists/${listId}`;

    fetch(url, {
      method: "PATCH",
      body: JSON.stringify({ type }),
      headers: {
        "Content-type": "application/json",
      },
    }).then(() => this.#fetchTodosAndRender());
  }

  start() {
    this.#fetchTodosAndRender();

    this.#view.onNewList((title) => this.#addList(title));

    this.#view.on("addTodo", (listId, description) =>
      this.#addTodo(listId, description)
    );

    this.#view.on("toggleDoneStatus", (listId, todoId, isDone) =>
      this.#toggleDoneStatus(listId, todoId, isDone)
    );

    this.#view.on("removeTodo", (listId, todoId) =>
      this.#removeTodo(listId, todoId)
    );

    this.#view.on("sort", (listId, type) => this.#updateSort(listId, type));
  }
}
