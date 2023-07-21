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
    this.#todos = [];
  }

  #generateId() {
    this.#id++;
    return this.#id;
  }

  addTodo(description) {
    const todoId = this.#generateId();
    const todo = new Todo(description, todoId); // TODO: generate an id in todo class
    this.#todos.push(todo);
  }

  markOrUnmarkTodo(id) {
    this.#todos.find((todo) => todo.id === +id).toggleDoneStatus();
  }

  getTodos() {
    return this.#todos;
  }

  getSortedTodos() {
    return this.#todos.toSorted((a, b) => (a.comesBefore(b) ? -1 : 1));
  }

  #getUndoneTodos() {
    return this.#todos.filter((todo) => !todo.isDone());
  }

  #getDoneTodos() {
    return this.#todos.filter((todo) => todo.isDone());
  }

  getGroupedTodos() {
    return [...this.#getUndoneTodos(), ...this.#getDoneTodos()];
  }

  deleteTodo(id) {
    this.#todos.forEach((todo, index) => {
      if (todo.id === id) this.#todos.splice(index, 1);
    });
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

  #getArrangedTodos() {
    if (this.#isGrouped) return this.#todos.getGroupedTodos();
    if (this.#isSorted) return this.#todos.getSortedTodos();
    return this.#todos.getTodos();
  }

  #getState() {
    return {
      todos: this.#getArrangedTodos(),
      isGrouped: this.#isGrouped,
      isSorted: this.#isSorted,
    };
  }

  #onNewTodo(todoMessage) {
    this.#todos.addTodo(todoMessage);
    this.#view.render(this.#getState());
  }

  #onMarkOrUnmark(id) {
    this.#todos.markOrUnmarkTodo(id);
    this.#view.render(this.#getState());
  }

  #onDelete(id) {
    this.#todos.deleteTodo(id);
    this.#view.render(this.#getState());
  }

  #onSort() {
    this.#isSorted = !this.#isSorted;
    this.#view.render(this.#getState());
  }

  #onGroup() {
    this.#isGrouped = !this.#isGrouped;
    this.#view.render(this.#getState());
  }

  start() {
    this.#inputController.onNewTodo((message) => this.#onNewTodo(message));
    this.#inputController.onSort(() => this.#onSort());
    this.#inputController.onGroup(() => this.#onGroup());
    this.#view.registerMarkListener((id) => this.#onMarkOrUnmark(id));
    this.#view.registerDeleteListener((id) => this.#onDelete(id));
  }
}

class MouseController {
  #addButtonElement;
  #inputboxElement;
  #sortButton;
  #groupButton;

  constructor(addButtonElement, inputboxElement, sortButton, groupButton) {
    this.#addButtonElement = addButtonElement;
    this.#inputboxElement = inputboxElement;
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
  #markListener;
  #deleteListener;

  constructor(todosContainer, sortButton, groupButton) {
    this.#todosContainer = todosContainer;
    this.#sortButton = sortButton;
    this.#groupButton = groupButton;
  }

  #styleOnMarkOrUnmark(todoMessage, checkbox) {
    todoMessage.style.textDecoration = "line-through";
    checkbox.value = "unmark";
  }

  #createDeleteButton(id) {
    const deleteButton = document.createElement("input");
    const deleteButtonId = `delete-${id}`;

    deleteButton.type = "button";
    deleteButton.value = "delete";
    deleteButton.classList.add("delete-button");
    deleteButton.id = deleteButtonId;

    deleteButton.onclick = () => {
      const deleteButtonId = +deleteButton.id.split("-")[1];
      this.#deleteListener(deleteButtonId);
    };

    return deleteButton;
  }

  #createMarkButton(id) {
    const markButton = document.createElement("input");
    const markButtonId = `mark-${id}`;

    markButton.type = "button";
    markButton.value = "mark";
    markButton.classList.add("checkbox");
    markButton.id = markButtonId;

    markButton.onclick = () => {
      const markButtonId = +markButton.id.split("-")[1];
      this.#markListener(markButtonId);
    };

    return markButton;
  }

  #createTodoElement(todo) {
    const todoElement = document.createElement("section");
    const todoMessage = document.createElement("p");
    const markButton = this.#createMarkButton(todo.id);
    const deleteButton = this.#createDeleteButton(todo.id);

    if (todo.isDone()) this.#styleOnMarkOrUnmark(todoMessage, markButton);

    todoMessage.innerText = todo.description;
    todoElement.appendChild(todoMessage);
    todoElement.appendChild(markButton);
    todoElement.appendChild(deleteButton);
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

  registerMarkListener(listener) {
    this.#markListener = listener;
  }

  registerDeleteListener(listener) {
    this.#deleteListener = listener;
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
