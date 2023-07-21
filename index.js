class Task {
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
}

class Todo {
  #tasks;
  #id;
  #orderType;

  constructor() {
    this.#id = 0;
    this.#tasks = [];
    this.#orderType = "creation date";
  }

  #generateId() {
    this.#id++;
    return this.#id;
  }

  setOrderToDefault() {
    this.#orderType = "creation date";
  }

  setOrderToAlphabetic() {
    this.#orderType = "alphabetic";
  }

  setOrderToGroup() {
    this.#orderType = "group";
  }

  addTask(description) {
    const taskId = this.#generateId();
    const task = new Task(description, taskId);
    this.#tasks.push(task);
  }

  markOrUnmarkTask(id) {
    this.#tasks.find((task) => task.id === +id).toggleDoneStatus();
  }

  #getSortedTasks() {
    return this.#tasks.toSorted((a, b) =>
      a.description < b.description ? -1 : 1
    );
  }

  #getGroupedTasks() {
    return this.#tasks.toSorted((a, b) =>
      a.isDone() === true && b.isDone() === false ? 1 : -1
    );
  }

  getTasks() {
    if (this.#orderType === "alphabetic") return this.#getSortedTasks();
    if (this.#orderType === "group") return this.#getGroupedTasks();
    return this.#tasks;
  }

  deleteTask(id) {
    const indexOfTaskToDelete = this.#tasks.findIndex((task) => task.id === id);
    this.#tasks.splice(indexOfTaskToDelete, 1);
  }
}

class TodosController {
  #todo;
  #view;
  #inputController;

  constructor(todo, view, inputController) {
    this.#todo = todo;
    this.#view = view;
    this.#inputController = inputController;
  }

  #onNewTodo(taskMessage) {
    if (taskMessage === "") return;
    this.#todo.addTask(taskMessage);
    this.#view.render(this.#todo.getTasks());
  }

  #onMarkOrUnmark(id) {
    this.#todo.markOrUnmarkTask(id);
    this.#view.render(this.#todo.getTasks());
  }

  #onDelete(id) {
    this.#todo.deleteTask(id);
    this.#view.render(this.#todo.getTasks());
  }

  #onSort() {
    this.#todo.setOrderToAlphabetic();
    this.#view.render(this.#todo.getTasks());
  }

  #onGroup() {
    this.#todo.setOrderToGroup();
    this.#view.render(this.#todo.getTasks());
  }

  #onDefault() {
    this.#todo.setOrderToDefault();
    this.#view.render(this.#todo.getTasks());
  }

  start() {
    this.#inputController.onNewTask((message) => this.#onNewTodo(message));
    this.#inputController.onSort(() => this.#onSort());
    this.#inputController.onGroup(() => this.#onGroup());
    this.#inputController.onDefault(() => this.#onDefault());
    this.#view.registerMarkListener((id) => this.#onMarkOrUnmark(id));
    this.#view.registerDeleteListener((id) => this.#onDelete(id));
  }
}

class MouseController {
  #addButtonElement;
  #inputboxElement;
  #sortButton;
  #groupButton;
  #defaultButton;

  constructor(
    addButtonElement,
    inputboxElement,
    sortButton,
    groupButton,
    defaultButton
  ) {
    this.#addButtonElement = addButtonElement;
    this.#inputboxElement = inputboxElement;
    this.#sortButton = sortButton;
    this.#groupButton = groupButton;
    this.#defaultButton = defaultButton;
  }

  #resetInputBox() {
    this.#inputboxElement.value = "";
  }

  onNewTask(listener) {
    this.#addButtonElement.onclick = () => {
      const taskMessage = this.#inputboxElement.value;

      this.#resetInputBox();
      listener(taskMessage);
    };
  }

  onSort(listener) {
    this.#sortButton.onclick = listener;
  }

  onGroup(listener) {
    this.#groupButton.onclick = listener;
  }

  onDefault(listener) {
    this.#defaultButton.onclick = listener;
  }
}

class TodosView {
  #todosContainer;
  #markListener;
  #deleteListener;

  constructor(todosContainer) {
    this.#todosContainer = todosContainer;
  }

  #styleOnMarkOrUnmark(taskMessage, checkbox) {
    taskMessage.classList.add("strike");
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

  #createTaskElement(task) {
    const taskElement = document.createElement("section");
    const taskMessage = document.createElement("p");
    const markButton = this.#createMarkButton(task.id);
    const deleteButton = this.#createDeleteButton(task.id);

    if (task.isDone()) this.#styleOnMarkOrUnmark(taskMessage, markButton);

    taskMessage.innerText = task.description;
    taskElement.appendChild(taskMessage);
    taskElement.appendChild(markButton);
    taskElement.appendChild(deleteButton);
    taskElement.classList.add("task");

    return taskElement;
  }

  #removeTasks() {
    [...this.#todosContainer.children].forEach((child) =>
      this.#todosContainer.removeChild(child)
    );
  }

  registerMarkListener(listener) {
    this.#markListener = listener;
  }

  registerDeleteListener(listener) {
    this.#deleteListener = listener;
  }

  render(tasks) {
    this.#removeTasks();

    tasks.forEach((task) => {
      const taskElement = this.#createTaskElement(task);
      this.#todosContainer.appendChild(taskElement);
    });
  }
}

const createMouseController = () => {
  const addButton = document.querySelector("#add-button");
  const inputBox = document.querySelector("#input-box");
  const defaultButton = document.querySelector("#creation-sort-button");
  const sortButton = document.querySelector("#alphabetic-sort-button");
  const groupButton = document.querySelector("#group-button");

  return new MouseController(
    addButton,
    inputBox,
    sortButton,
    groupButton,
    defaultButton
  );
};

const main = () => {
  const tasksContainer = document.querySelector("#tasks-container");

  const todo = new Todo();
  const todosView = new TodosView(tasksContainer);
  const mouseController = createMouseController();
  const todosController = new TodosController(todo, todosView, mouseController);

  todosController.start();
};

window.onload = main;
