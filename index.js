class Todo {
  #description;
  #id;
  #done;

  constructor(description, id) {
    this.#description = description;
    this.#id = id;
    this.#done = false;
  }

  toggleDoneStatus() {
    this.#done = !this.#done;
  }

  isDone() {
    return this.#done;
  }

  get description() {
    return this.#description;
  }

  get asciiValue() {
    return this.#description.charCodeAt();
  }

  get id() {
    return this.#id;
  }

  comesBefore(todo) {
    return this.#description < todo.description;
  }
}

class Todos {
  #todos;
  #id;
  #isSorted;

  constructor() {
    this.#id = 1;
    this.#isSorted = false;
    this.#todos = {};
  }

  #getTodosList() {
    return Object.values(this.#todos);
  }

  isSorted() {
    return this.#isSorted;
  }

  toggleSortStatus() {
    this.#isSorted = !this.#isSorted;
  }

  addTodo(description) {
    const todo = new Todo(description, this.#id); // TODO: generate an id in todo class
    this.#todos[this.#id++] = todo;
  }

  markOrUnmarkTodo(id) {
    this.#todos[id].toggleDoneStatus();
  }

  getTodos() {
    return this.#getTodosList();
  }

  getSortedTodos() {
    return this.#getTodosList().sort((a, b) => (a.comesBefore(b) ? -1 : 1));
  }
}

class TodoController {
  #todos;
  #viewer;
  #inputController;

  constructor(todos, viewer, inputController) {
    this.#todos = todos;
    this.#viewer = viewer;
    this.#inputController = inputController;
  }

  #getTodos() {
    return this.#todos.isSorted()
      ? this.#todos.getSortedTodos()
      : this.#todos.getTodos();
  }

  #onNewTodo(todoMessage) {
    this.#todos.addTodo(todoMessage);
    this.#viewer.render(this.#getTodos());
  }

  #onMarkOrUnmark(id) {
    this.#todos.markOrUnmarkTodo(id);
    this.#viewer.render(this.#getTodos());
  }

  #onSort() {
    this.#todos.toggleSortStatus();
    this.#viewer.render(this.#getTodos());
  }

  start() {
    this.#inputController.onNewTodo((message) => this.#onNewTodo(message));
    this.#inputController.onMarkOrUnmark((id) => this.#onMarkOrUnmark(id));
    this.#inputController.onSort(() => this.#onSort());
  }
}

class MouseController {
  #addButtonElement;
  #todosContainer;
  #inputboxElement;
  #sortButton;

  constructor(addButtonElement, inputboxElement, todosContainer, sortButton) {
    this.#addButtonElement = addButtonElement;
    this.#inputboxElement = inputboxElement;
    this.#todosContainer = todosContainer;
    this.#sortButton = sortButton;
  }

  onNewTodo(listener) {
    this.#addButtonElement.onclick = () => {
      const todoMessage = this.#inputboxElement.value;
      listener(todoMessage);
    };
  }

  onMarkOrUnmark(listener) {
    this.#todosContainer.onclick = (event) => {
      const checkbox = event.target;

      if (checkbox.className === "checkbox") {
        listener(checkbox.id);
      }
    };
  }

  onSort(listener) {
    this.#sortButton.onclick = () => {
      listener();
    };
  }
}

class TodosViewer {
  #todosContainer;

  constructor(todosContainer) {
    this.#todosContainer = todosContainer;
  }

  #changeStyleOnCheck(todoMessage, checkbox) {
    todoMessage.style.textDecoration = "line-through";
    checkbox.value = "unmark";
  }

  #createCheckbox(id) {
    const checkBox = document.createElement("input");

    checkBox.type = "button";
    checkBox.value = "mark";
    checkBox.classList.add("checkbox");
    checkBox.id = id;

    return checkBox;
  }

  #createTodoElement(todo) {
    // TODO: break into private methods
    const todoElement = document.createElement("section");
    const todoMessage = document.createElement("p");
    const checkbox = this.#createCheckbox(todo.id);

    if (todo.isDone()) this.#changeStyleOnCheck(todoMessage, checkbox);

    todoMessage.innerText = todo.description;
    todoElement.appendChild(todoMessage);
    todoElement.appendChild(checkbox);
    todoElement.classList.add("todo");

    return todoElement;
  }

  #removeTodos() {
    [...this.#todosContainer.children].forEach((child) =>
      this.#todosContainer.removeChild(child)
    );
  }

  render(todos) {
    this.#removeTodos();

    todos.forEach((todo) => {
      const todoElement = this.#createTodoElement(todo);
      this.#todosContainer.appendChild(todoElement);
    });
  }
}

const main = () => {
  const todosContainer = document.querySelector("#todos-container");
  const addButton = document.querySelector("#add-button");
  const inputBox = document.querySelector("#input-box");
  const sortButton = document.querySelector("#sort-button");

  const todos = new Todos();
  const todosViewer = new TodosViewer(todosContainer);

  const mouseController = new MouseController(
    addButton,
    inputBox,
    todosContainer,
    sortButton
  );

  const todoController = new TodoController(
    todos,
    todosViewer,
    mouseController
  );

  todoController.start();
};

window.onload = main;
