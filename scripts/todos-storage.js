class TodosStorage {
  #localStorage;

  constructor(localStorage) {
    this.#localStorage = localStorage;
  }

  fetch() {
    return JSON.parse(this.#localStorage.getItem("todos")) || [];
  }

  update(todos) {
    this.#localStorage.setItem("todos", JSON.stringify(todos));
  }
}
