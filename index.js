const getTasksContainer = () => document.querySelector("#tasks-container");

const getReadTaskSection = () => document.querySelector(".input-task");

const getTaskElement = (checkBox) =>
  checkBox.parentElement.querySelector("span");

const hasMarked = (task) => task.style.backgroundColor === "red";

const onTaskComplete = (checkBox) => {
  const task = getTaskElement(checkBox);
  const bgColor = hasMarked(task) ? "" : "red";
  task.style.backgroundColor = bgColor;
};

const createCheckBox = () => {
  const checkBox = document.createElement("input");
  checkBox.type = "button";
  checkBox.onclick = () => onTaskComplete(checkBox);
  return checkBox;
};

const createTaskElement = (taskText) => {
  const taskElement = document.createElement("section");
  const task = document.createElement("span");
  const checkBox = createCheckBox();

  task.innerText = taskText;
  taskElement.appendChild(checkBox);
  taskElement.appendChild(task);

  return taskElement;
};

const onNewTask = () => {
  const readTaskSection = getReadTaskSection();
  const taskText = readTaskSection.value;

  const taskElement = createTaskElement(taskText);
  const tasksContainer = getTasksContainer();
  tasksContainer.appendChild(taskElement);
};

const createAddTaskSection = () => {
  const taskSection = document.createElement("section");
  const readTaskSection = document.createElement("input");
  readTaskSection.classList.add("input-task");
  const addButton = document.createElement("input");

  addButton.type = "button";
  addButton.value = "Add";
  addButton.onclick = onNewTask;

  taskSection.appendChild(readTaskSection);
  taskSection.appendChild(addButton);

  return taskSection;
};

const main = () => {
  const tasksContainer = getTasksContainer();
  const addTaskSection = createAddTaskSection();
  tasksContainer.appendChild(addTaskSection);
};

window.onload = main;
