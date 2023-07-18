const getTasksContainer = () => document.querySelector("#tasks-container");

const getReadTaskSection = () => document.querySelector(".input-task");

const createTaskElement = (taskText) => {
  const taskContainer = document.createElement("section");
  const checkButton = document.createElement("input");
  checkButton.type = "button";
  const task = document.createElement("span");

  task.innerText = taskText;
  taskContainer.appendChild(checkButton);
  taskContainer.appendChild(task);

  return taskContainer;
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
