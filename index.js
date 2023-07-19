const getTodosContainer = () => document.querySelector("#todos-container");

const getInputBox = () => document.querySelector("#input-box");

const getAddButton = () => document.querySelector("#add-button");

const gettodoElement = (checkBox) => checkBox.parentElement.querySelector("p");

const hasMarked = (todo) => todo.style.backgroundColor === "green";

const ontodoComplete = (checkBox) => {
  const todo = gettodoElement(checkBox);
  const bgColor = hasMarked(todo) ? "" : "green";
  todo.style.backgroundColor = bgColor;
};

class Todo {
  #value;
  #id;
  #done;

  constructor(value, id) {
    this.#value = value;
    this.#id = id;
    this.#done = false;
  }

  changeStatus() {
    this.#done = !this.#done;
  }

  get value() {
    return this.#value;
  }

  get id() {
    return this.#id;
  }
}

class Todos {
  #todos;
  #id;

  constructor() {
    this.#id = 1;
    this.#todos = {};
  }

  addTodo(value) {
    const todo = new Todo(value, this.#id++);
    this.#todos[this.#id] = todo;
  }

  markOrUnmarkTodo(id) {
    this.#todos[id].changeStatus();
  }

  getTodos() {
    return Object.values(this.#todos);
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

  #onNewTodo(todoMessage) {
    this.#todos.addTodo(todoMessage);
    this.#viewer.render(this.#todos.getTodos());
  }

  #onMarkOrUnmark(id) {
    this.#todos.markOrUnmarkTodo(id);
    this.#viewer.render(this.#todos.getTodos());
  }

  start() {
    this.#inputController.onNewTodo((message) => this.#onNewTodo(message));
    this.#inputController.onMarkOrUnmark((id) => this.#onMarkOrUnmark(id));
  }
}

class MouseController {
  #addButtonElement;
  #todosContainer;
  #inputboxElement;

  constructor(addButtonElement, inputboxElement, todosContainer) {
    this.#addButtonElement = addButtonElement;
    this.#inputboxElement = inputboxElement;
    this.#todosContainer = todosContainer;
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
}

class TodosViewer {
  #todosContainer;
  #checkboxId;

  constructor(todosContainer) {
    this.#todosContainer = todosContainer;
    this.#checkboxId = 1;
  }

  #createCheckbox() {
    const checkBox = document.createElement("input");

    checkBox.type = "button";
    checkBox.value = "done";
    checkBox.classList.add("checkbox");
    checkBox.id = this.#checkboxId++;

    return checkBox;
  }

  #createTodoElement(todoText) {
    const todoElement = document.createElement("section");
    const todo = document.createElement("p");
    const checkBox = this.#createCheckbox();

    todo.innerText = todoText;
    todoElement.appendChild(todo);
    todoElement.appendChild(checkBox);
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
      const todoElement = this.#createTodoElement(todo.value);
      this.#todosContainer.appendChild(todoElement);
    });
  }
}

const main = () => {
  const todosContainer = getTodosContainer();
  const addButton = getAddButton();
  const inputBox = getInputBox();

  const todos = new Todos();
  const todosViewer = new TodosViewer(todosContainer);
  const mouseController = new MouseController(
    addButton,
    inputBox,
    todosContainer
  );

  const todoController = new TodoController(
    todos,
    todosViewer,
    mouseController
  );

  todoController.start();
};

window.onload = main;
