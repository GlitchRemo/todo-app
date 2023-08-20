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
    fetch("/todos", {
      method: "post",
      body: JSON.stringify({ title }),
      headers: {
        "Content-type": "application/json",
      },
    }).then(() => this.fetchTodos(onNewTodo));
  }

  addTask(todoId, description, onNewTask) {
    fetch("/todos/tasks", {
      method: "POST",
      body: JSON.stringify({ description, todoId }),
      headers: {
        "Content-type": "application/json",
      },
    }).then(() => this.fetchTodos(onNewTask));
  }

  updateTodoStatus(todoId, taskId, isDone, onTodoStatusUpdate) {
    fetch("/todos/tasks/task", {
      method: "PATCH",
      body: JSON.stringify({ todoId, taskId, isDone }),
      headers: {
        "Content-type": "application/json",
      },
    }).then(() => {
      this.fetchTodos(onTodoStatusUpdate);
    });
  }

  update(todos) {
    this.#localStorage.setItem("todos", JSON.stringify(todos));
  }
}
