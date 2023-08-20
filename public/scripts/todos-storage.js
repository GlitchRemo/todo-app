class TodosStorage {
  #localStorage;

  constructor(localStorage) {
    this.#localStorage = localStorage;
  }

  fetch(createTodos) {
    fetch("/todos")
      .then((res) => res.json())
      .then(createTodos);
  }

  update(todos) {
    this.#localStorage.setItem("todos", JSON.stringify(todos));
  }
}
