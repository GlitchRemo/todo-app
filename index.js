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

const createCheckBox = () => {
  const checkBox = document.createElement("input");

  checkBox.type = "button";
  checkBox.value = "done";
  checkBox.classList.add("checkbox");
  checkBox.onclick = () => onTaskComplete(checkBox);

  return checkBox;
};

const createTaskElement = (taskText) => {
  const taskElement = document.createElement("section");
  const task = document.createElement("p");
  const checkBox = createCheckBox();

  task.innerText = taskText;
  taskElement.appendChild(task);
  taskElement.appendChild(checkBox);
  taskElement.classList.add("task");

  return taskElement;
};

const onNewTask = () => {
  const inputBox = getInputBox();
  const taskText = inputBox.value;

  const taskElement = createTaskElement(taskText);
  const tasksContainer = getTasksContainer();
  tasksContainer.appendChild(taskElement);
};

const main = () => {
  const addButton = getAddButton();
  addButton.onclick = onNewTask;
};

window.onload = main;
