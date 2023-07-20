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

  constructor() {
    this.#id = 0;
    this.#todos = {};
  }

  #generateId() {
    this.#id++;
    return this.#id;
  }

  #getTodosList() {
    return Object.values(this.#todos);
  }

  addTodo(description) {
    const todoId = this.#generateId();
    const todo = new Todo(description, todoId); // TODO: generate an id in todo class
    this.#todos[todoId] = todo;
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

  #getUndoneTodos() {
    return this.#getTodosList().filter((todo) => !todo.isDone());
  }

  #getDoneTodos() {
    return this.#getTodosList().filter((todo) => todo.isDone());
  }

  getGroupedTodos() {
    return [...this.#getUndoneTodos(), ...this.#getDoneTodos()];
  }
}

class TodosController {
  #todos;
  #viewer;
  #inputController;
  #sortBy;

  constructor(todos, viewer, inputController) {
    this.#todos = todos;
    this.#viewer = viewer;
    this.#inputController = inputController;
    this.#sortBy = ["date", "alphabets", "done"];
  }

  #arrangeAndRender() {
    if (this.#sortBy[0] === "alphabets") {
      const todos = this.#todos.getSortedTodos();
      this.#viewer.render({ todos, sortBy: this.#sortBy[1] });
      return;
    }

    if (this.#sortBy[0] === "date") {
      const todos = this.#todos.getTodos();
      this.#viewer.render({ todos, sortBy: this.#sortBy[1] });
      return;
    }

    if (this.#sortBy[0] === "done") {
      const todos = this.#todos.getGroupedTodos();
      this.#viewer.render({ todos, sortBy: this.#sortBy[1] });
      return;
    }
  }

  #onNewTodo(todoMessage) {
    this.#todos.addTodo(todoMessage);
    this.#arrangeAndRender();
  }

  #onMarkOrUnmark(id) {
    this.#todos.markOrUnmarkTodo(id);
    this.#arrangeAndRender();
  }

  #onSort() {
    this.#sortBy.push(this.#sortBy.shift());
    this.#arrangeAndRender();
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

  #resetInputBox() {
    this.#inputboxElement.value = "";
  }

  onNewTodo(listener) {
    this.#addButtonElement.onclick = () => {
      const todoMessage = this.#inputboxElement.value;

      this.#resetInputBox();
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
  #sortButton;

  constructor(todosContainer, sortButton) {
    this.#todosContainer = todosContainer;
    this.#sortButton = sortButton;
  }

  #styleOnMarkOrUnmark(todoMessage, checkbox) {
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

    if (todo.isDone()) this.#styleOnMarkOrUnmark(todoMessage, checkbox);

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

  #changeSortButtonValue(sortBy) {
    const text = `Sort By ${sortBy}`;
    this.#sortButton.value = text;
  }

  #isEmptyTodo(todo) {
    return todo.description === "";
  }

  render({ todos, sortBy }) {
    this.#removeTodos();
    this.#changeSortButtonValue(sortBy);

    todos.forEach((todo) => {
      if (this.#isEmptyTodo(todo)) return;

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
  const todosViewer = new TodosViewer(todosContainer, sortButton);

  const mouseController = new MouseController(
    addButton,
    inputBox,
    todosContainer,
    sortButton
  );

  const todosController = new TodosController(
    todos,
    todosViewer,
    mouseController
  );

  todosController.start();
};

window.onload = main;
