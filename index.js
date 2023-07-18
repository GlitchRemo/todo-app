const getTasksContainer = () => document.querySelector("#tasks-container");

const createTaskElement = (taskText) => {
  const itemContainer = document.createElement("section");
  const task = document.createElement("span");
  task.innerText = taskText;
  itemContainer.appendChild(task);
  return itemContainer;
};

const main = () => {
  const tasks = [
    "Buy eggs from supermarket.",
    "Finish Code Of Conduct training on campus.",
    "Finish day 15 part 2 of Advent of Code problem.",
    "Fill timesheet.",
  ];

  const tasksContainer = getTasksContainer();
  const taskElements = tasks.map(createTaskElement);
  taskElements.forEach((task) => tasksContainer.appendChild(task));
};

window.onload = main;
