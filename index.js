const getMainSection = () => document.querySelector("#main-section");

const getReadTaskSection = () => document.querySelector(".input-task");

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
  const readTaskSection = getReadTaskSection();
  const taskText = readTaskSection.value;

  const taskElement = createTaskElement(taskText);
  const tasksContainer = getMainSection();
  tasksContainer.appendChild(taskElement);
};

const createAddButton = () => {
  const addButton = document.createElement("input");

  addButton.type = "button";
  addButton.value = "Add";
  addButton.onclick = onNewTask;

  return addButton;
};

const createAddTaskSection = () => {
  const taskSection = document.createElement("section");

  const readTaskSection = document.createElement("input");
  readTaskSection.classList.add("input-task");

  const addButton = createAddButton();

  taskSection.appendChild(readTaskSection);
  taskSection.appendChild(addButton);

  return taskSection;
};

const main = () => {
  const mainSection = getMainSection();
  const addTaskSection = createAddTaskSection();
  mainSection.appendChild(addTaskSection);
};

window.onload = main;
