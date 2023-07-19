const gettodosContainer = () => document.querySelector("#todos-container");

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

  getTodos() {
    return Object.values(this.#todos);
  }
}

class TodoViewer {
  #todosContainer;

  constructor(todosContainer) {
    this.#todosContainer = todosContainer;
  }

  #createCheckBox() {
    const checkBox = document.createElement("input");

    checkBox.type = "button";
    checkBox.value = "done";
    checkBox.classList.add("checkbox");

    return checkBox;
  }

  #createtodoElement(todoText) {
    const todoElement = document.createElement("section");
    const todo = document.createElement("p");
    const checkBox = this.#createCheckBox();

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
      const todoElement = this.#createtodoElement(todo.value);
      this.#todosContainer.appendChild(todoElement);
    });
  }
}

const main = () => {
  const todos = new Todos();
  const todosContainer = gettodosContainer();
  const todoViewer = new TodoViewer(todosContainer);

  const addButton = getAddButton();

  addButton.onclick = () => {
    const inputBox = getInputBox();
    const todoText = inputBox.value;
    todos.addTodo(todoText);
    todoViewer.render(todos.getTodos());
  };
};

window.onload = main;
