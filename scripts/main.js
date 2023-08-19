const main = () => {
  const todosContainer = document.querySelector("#todos-container");
  const titleInputBox = document.querySelector(".input-box");
  const addTitleButton = document.querySelector("#add-button");

  const todos = new Todos();
  const todosStorage = new TodosStorage(localStorage);
  const todosView = new TodosView(todosContainer);
  const mouseController = new MouseController(addTitleButton, titleInputBox);
  const todosController = new TodosController(
    todos,
    todosStorage,
    todosView,
    mouseController
  );

  todosController.start();
};

window.onload = main;
