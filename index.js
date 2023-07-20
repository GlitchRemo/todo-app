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
  #view;
  #inputController;
  #isSorted;
  #isGrouped;

  constructor(todos, view, inputController) {
    this.#todos = todos;
    this.#view = view;
    this.#inputController = inputController;
    this.#isSorted = false;
    this.#isGrouped = false;
  }

  #onNewTodo(todoMessage) {
    this.#todos.addTodo(todoMessage);
    this.#view.render({
      todos: this.#todos.getTodos(),
      isGrouped: this.#isGrouped,
      isSorted: this.#isSorted,
    });
  }

  #onMarkOrUnmark(id) {
    this.#todos.markOrUnmarkTodo(id);
    this.#view.render({
      todos: this.#todos.getTodos(),
      isGrouped: this.#isGrouped,
      isSorted: this.#isSorted,
    });
  }

  #onSort() {
    this.#isSorted = !this.#isSorted;
    const todos = this.#isSorted
      ? this.#todos.getSortedTodos()
      : this.#todos.getTodos();

    this.#view.render({
      todos,
      isGrouped: this.#isGrouped,
      isSorted: this.#isSorted,
    });
  }

  #onGroup() {
    this.#isGrouped = !this.#isGrouped;
    const todos = this.#isGrouped
      ? this.#todos.getGroupedTodos()
      : this.#todos.getTodos();

    this.#view.render({
      todos,
      isGrouped: this.#isGrouped,
      isSorted: this.#isSorted,
    });
  }

  start() {
    this.#inputController.onNewTodo((message) => this.#onNewTodo(message));
    this.#inputController.onMarkOrUnmark((id) => this.#onMarkOrUnmark(id));
    this.#inputController.onSort(() => this.#onSort());
    this.#inputController.onGroup(() => this.#onGroup());
  }
}

class MouseController {
  #addButtonElement;
  #todosContainer;
  #inputboxElement;
  #sortButton;
  #groupButton;

  constructor(
    addButtonElement,
    inputboxElement,
    todosContainer,
    sortButton,
    groupButton
  ) {
    this.#addButtonElement = addButtonElement;
    this.#inputboxElement = inputboxElement;
    this.#todosContainer = todosContainer;
    this.#sortButton = sortButton;
    this.#groupButton = groupButton;
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

  onGroup(listener) {
    this.#groupButton.onclick = () => {
      listener();
    };
  }
}

class TodosView {
  #todosContainer;
  #sortButton;
  #groupButton;

  constructor(todosContainer, sortButton, groupButton) {
    this.#todosContainer = todosContainer;
    this.#sortButton = sortButton;
    this.#groupButton = groupButton;
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

  #changeSortButtonValue(isSorted) {
    const text = isSorted ? "Sort By Date" : "Sort Alphabetically";
    this.#sortButton.value = text;
  }

  #changeGroupButtonValue(isGrouped) {
    const text = isGrouped ? "Sort By Creation Date" : "Group By Done";
    this.#groupButton.value = text;
  }

  #isEmptyTodo(todo) {
    return todo.description === "";
  }

  render({ todos, isSorted, isGrouped }) {
    this.#removeTodos();
    this.#changeSortButtonValue(isSorted);
    this.#changeGroupButtonValue(isGrouped);

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
  const groupButton = document.querySelector("#group-button");

  const todos = new Todos();
  const todosView = new TodosView(todosContainer, sortButton, groupButton);

  const mouseController = new MouseController(
    addButton,
    inputBox,
    todosContainer,
    sortButton,
    groupButton
  );

  const todosController = new TodosController(
    todos,
    todosView,
    mouseController
  );

  todosController.start();
};

window.onload = main;
