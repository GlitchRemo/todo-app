const getTasksContainer = () => document.querySelector("#tasks-container");

const getInputBox = () => document.querySelector("#input-box");

const getAddButton = () => document.querySelector("#add-button");

const getTaskElement = (checkBox) => checkBox.parentElement.querySelector("p");

const hasMarked = (task) => task.style.backgroundColor === "green";

const onTaskComplete = (checkBox) => {
  const task = getTaskElement(checkBox);
  const bgColor = hasMarked(task) ? "" : "green";
  task.style.backgroundColor = bgColor;
};

class Task {
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

class Tasks {
  #tasks;
  #id;

  constructor() {
    this.#id = 1;
    this.#tasks = [];
  }

  addTask(value) {
    const task = new Task(value, this.#id);
    this.#id++;
    this.#tasks.push(task);
  }

  getTasks() {
    console.log(this.#tasks);
    return this.#tasks;
  }
}

class ViewTask {
  #tasksContainer;
  constructor(tasksContainer) {
    this.#tasksContainer = tasksContainer;
  }

  #createCheckBox() {
    const checkBox = document.createElement("input");

    checkBox.type = "button";
    checkBox.value = "done";
    checkBox.classList.add("checkbox");

    return checkBox;
  }

  #createTaskElement(taskText) {
    const taskElement = document.createElement("section");
    const task = document.createElement("p");
    const checkBox = this.#createCheckBox();

    task.innerText = taskText;
    taskElement.appendChild(task);
    taskElement.appendChild(checkBox);
    taskElement.classList.add("task");

    return taskElement;
  }

  render(tasks) {
    tasks.forEach((task) => {
      console.log(task.value);
      const taskElement = this.#createTaskElement(task.value);
      this.#tasksContainer.appendChild(taskElement);
    });
  }
}

const main = () => {
  const tasks = new Tasks();
  const tasksContainer = getTasksContainer();
  const view = new ViewTask(tasksContainer);

  const addButton = getAddButton();

  addButton.onclick = () => {
    const inputBox = getInputBox();
    const taskText = inputBox.value;
    tasks.addTask(taskText);
    view.render(tasks.getTasks());
  };
};

window.onload = main;
