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
