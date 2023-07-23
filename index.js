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
  #title;
  #taskId;

  constructor({ title, id }) {
    this.#title = title;
    this.#id = id;
    this.#taskId = 0;
    this.#tasks = [];
    this.#orderType = { alphabetic: false, date: true, status: false };
  }

  #generateId() {
    this.#taskId++;
    return this.#taskId;
  }

  sortTodoBy({ alphabetic, status, date }) {
    if (alphabetic) {
      this.#orderType = { alphabetic: true, date: false, status: false };
      return;
    }

    if (status) {
      this.#orderType = { alphabetic: false, date: false, status: true };
      return;
    }

    if (date) {
      this.#orderType = { alphabetic: false, date: true, status: false };
      return;
    }
  }

  addTask(description) {
    const taskId = this.#generateId();
    const task = new Task(description, taskId);
    this.#tasks.push(task);
  }

  markOrUnmarkTask(id) {
    this.#tasks.find((task) => task.id === id).toggleDoneStatus();
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
    if (this.#orderType.alphabetic) return this.#getSortedTasks();
    if (this.#orderType.status) return this.#getGroupedTasks();
    return this.#tasks;
  }

  get title() {
    return this.#title;
  }

  get id() {
    return this.#id;
  }

  deleteTask(id) {
    const indexOfTaskToDelete = this.#tasks.findIndex((task) => task.id === id);
    this.#tasks.splice(indexOfTaskToDelete, 1);
  }
}

class Todos {
  #todos;
  #id;

  constructor() {
    this.#todos = [];
    this.#id = 0;
  }

  #generateId() {
    this.#id++;
    return this.#id;
  }

  addTodo(title) {
    const id = this.#generateId();
    this.#todos.push(new Todo({ id, title }));
  }

  addTask({ todoId, description }) {
    this.#todos.find((todo) => todo.id === todoId).addTask(description);
  }

  removeTask({ todoId, taskId }) {
    this.#todos.find((todo) => todo.id === todoId).deleteTask(taskId);
  }

  markOrUnmarkTask({ todoId, taskId }) {
    this.#todos.find((todo) => todo.id === todoId).markOrUnmarkTask(taskId);
  }

  sortTodoBy(todoId, { alphabetic, status, date }) {
    const todo = this.#todos.find((todo) => todo.id === todoId);
    todo.sortTodoBy({ alphabetic, date, status });
  }

  getTodos() {
    return this.#todos;
  }
}

class TodosController {
  #todos;
  #view;
  #inputController;

  constructor(todos, view, inputController) {
    this.#todos = todos;
    this.#view = view;
    this.#inputController = inputController;
  }

  #onNewTask({ todoId, description }) {
    this.#todos.addTask({ todoId, description });
    this.#view.render(this.#todos.getTodos());
  }

  #onNewTodo(title) {
    this.#todos.addTodo(title);
    this.#view.render(this.#todos.getTodos());
  }

  #onMarkOrUnmark({ taskId, todoId }) {
    this.#todos.markOrUnmarkTask({ taskId, todoId });
    this.#view.render(this.#todos.getTodos());
  }

  #onRemove({ taskId, todoId }) {
    this.#todos.removeTask({ taskId, todoId });
    this.#view.render(this.#todos.getTodos());
  }

  #onAlphabeticSort(todoId) {
    this.#todos.sortTodoBy(todoId, { alphabetic: true });
    this.#view.render(this.#todos.getTodos());
  }

  #onStatusSort(todoId) {
    this.#todos.sortTodoBy(todoId, { status: true });
    this.#view.render(this.#todos.getTodos());
  }

  #onDateSort(todoId) {
    this.#todos.sortTodoBy(todoId, { date: true });
    this.#view.render(this.#todos.getTodos());
  }

  start() {
    this.#inputController.onNewTodo((title) => this.#onNewTodo(title));
    this.#view.on("addTask", (task) => this.#onNewTask(task));
    this.#view.on("markTask", (ids) => this.#onMarkOrUnmark(ids));
    this.#view.on("removeTask", (ids) => this.#onRemove(ids));
    this.#view.on("alphabeticSort", (id) => this.#onAlphabeticSort(id));
    this.#view.on("dateSort", (id) => this.#onDateSort(id));
    this.#view.on("statusSort", (id) => this.#onStatusSort(id));
  }
}

class MouseController {
  #addButtonElement;
  #inputboxElement;

  constructor(addButtonElement, inputboxElement) {
    this.#addButtonElement = addButtonElement;
    this.#inputboxElement = inputboxElement;
  }

  #resetInputBox() {
    this.#inputboxElement.value = "";
  }

  onNewTodo(listener) {
    this.#addButtonElement.onclick = () => {
      const title = this.#inputboxElement.value;
      if (!title.trim()) return;

      this.#resetInputBox();
      listener(title);
    };
  }
}

class TodosView {
  #todosContainer;
  #listeners;

  constructor(todosContainer) {
    this.#todosContainer = todosContainer;
    this.#listeners = {};
  }

  on(eventName, listener) {
    this.#listeners[eventName] = listener;
  }

  #createAlphabeticSortButton(todoId) {
    const alphabeticButton = document.createElement("input");

    alphabeticButton.type = "button";
    alphabeticButton.value = "A-Z";

    alphabeticButton.onclick = () => {
      this.#listeners.alphabeticSort(todoId);
    };

    return alphabeticButton;
  }

  #createStatusSortButton(todoId) {
    const statusButton = document.createElement("input");

    statusButton.type = "button";
    statusButton.value = "Status";

    statusButton.onclick = () => {
      this.#listeners.statusSort(todoId);
    };

    return statusButton;
  }

  #createDateSortButton(todoId) {
    const dateButton = document.createElement("input");

    dateButton.type = "button";
    dateButton.value = "Date";

    dateButton.onclick = () => {
      this.#listeners.dateSort(todoId);
    };

    return dateButton;
  }

  #createAddTaskButton() {
    const addTaskButton = document.createElement("input");

    addTaskButton.type = "button";
    addTaskButton.value = "Add Task";

    return addTaskButton;
  }

  #createRemoveButton(task, todoId) {
    const deleteButton = document.createElement("input");

    deleteButton.type = "button";
    deleteButton.value = "remove";

    deleteButton.onclick = () => {
      this.#listeners.removeTask({ taskId: task.id, todoId });
    };

    return deleteButton;
  }

  #createTaskDescription(task, todoId) {
    const descriptionElement = document.createElement("section");

    const description = document.createElement("li");
    description.innerText = task.description;
    descriptionElement.append(description);

    if (task.isDone()) {
      description.classList.add("strike");
    }

    descriptionElement.onclick = () => {
      this.#listeners.markTask({ taskId: task.id, todoId });
    };

    return descriptionElement;
  }

  #createTaskElement(task, todoId) {
    const taskElement = document.createElement("section");

    const descriptionElement = this.#createTaskDescription(task, todoId);
    const removeButton = this.#createRemoveButton(task, todoId);
    taskElement.append(descriptionElement, removeButton);
    taskElement.classList.add("task");

    return taskElement;
  }

  // #createTaskElement(task, todoId) {
  //   const taskElement = document.createElement("section");
  //   const taskMessage = document.createElement("p");

  //   const markButton = this.#createMarkButton(task.id, todoId);
  //   const deleteButton = this.#createRemoveButton(task.id, todoId);

  //   if (task.isDone()) this.#styleOnMarkOrUnmark(taskMessage, markButton);

  //   taskMessage.innerText = task.description;
  //   taskElement.append(taskMessage, markButton, deleteButton);
  //   taskElement.classList.add("task");

  //   return taskElement;
  // }

  #createTitleElement(title, todoId) {
    const titleElement = document.createElement("section");
    const buttons = document.createElement("section");
    const heading = document.createElement("h2");

    heading.innerText = title;
    titleElement.classList.add("flex");
    buttons.classList.add("flex");

    const statusButton = this.#createStatusSortButton(todoId);
    const alphabeticSortButton = this.#createAlphabeticSortButton(todoId);
    const dateSortButton = this.#createDateSortButton(todoId);

    buttons.append(statusButton, alphabeticSortButton, dateSortButton);
    titleElement.append(heading, buttons);

    return titleElement;
  }

  #createInputBox() {
    const inputBox = document.createElement("input");
    inputBox.classList.add("input-box");
    inputBox.type = "text";
    inputBox.placeholder = "Enter a task...";
    return inputBox;
  }

  #createInputSection(todoId) {
    const inputSection = document.createElement("section");
    inputSection.classList.add("flex");

    const inputBox = this.#createInputBox();
    const addTaskButton = this.#createAddTaskButton();
    inputSection.append(inputBox, addTaskButton);

    addTaskButton.onclick = () => {
      const description = inputBox.value;
      if (!description.trim()) return;

      this.#listeners.addTask({ description, todoId });
    };

    return inputSection;
  }

  #createTodoSection(todo) {
    const todoSection = document.createElement("article");
    const tasksSection = document.createElement("section");

    const titleElement = this.#createTitleElement(todo.title, todo.id);
    const inputSection = this.#createInputSection(todo.id);

    todoSection.append(titleElement, inputSection);
    todoSection.classList.add("flex-column", "todo");
    tasksSection.classList.add("flex-column", "tasks");

    todo.getTasks().forEach((task) => {
      const todoElement = this.#createTaskElement(task, todo.id);
      tasksSection.appendChild(todoElement);
    });

    todoSection.appendChild(tasksSection);
    return todoSection;
  }

  #removeTodos() {
    [...this.#todosContainer.children].forEach((child) =>
      this.#todosContainer.removeChild(child)
    );
  }

  render(todos) {
    this.#removeTodos();

    todos.forEach((todo) => {
      const todoElement = this.#createTodoSection(todo);
      this.#todosContainer.appendChild(todoElement);
    });
  }
}

const main = () => {
  const todosContainer = document.querySelector("#todos-container");
  const titleInputBox = document.querySelector(".input-box");
  const addTitleButton = document.querySelector("#add-button");

  const todos = new Todos();
  const todosView = new TodosView(todosContainer);
  const mouseController = new MouseController(addTitleButton, titleInputBox);
  const todosController = new TodosController(
    todos,
    todosView,
    mouseController
  );

  todosController.start();
};

window.onload = main;
