class DatabaseService {
  #localStorage;

  constructor(localStorage) {
    this.#localStorage = localStorage;
  }

  fetchTodos(onFetch) {
    fetch("/todos")
      .then((res) => res.json())
      .then(onFetch);
  }

  addTodo(title, onNewTodo) {
    fetch("/todos", { method: "post", body: JSON.stringify({ title }) }).then(
      () => this.fetchTodos(onNewTodo)
    );
  }

  addTask(todoId, description, onNewTask) {
    fetch(`/todos/tasks`, {
      method: "post",
      body: JSON.stringify({ description, todoId }),
    }).then(() => this.fetchTodos(onNewTask));
  }

  update(todos) {
    this.#localStorage.setItem("todos", JSON.stringify(todos));
  }
}
