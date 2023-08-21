const main = () => {
  const todosContainer = document.querySelector("#todos-container");
  const titleInputBox = document.querySelector(".input-box");
  const addTitleButton = document.querySelector("#add-button");

  const todosView = new TodosView(todosContainer);
  const mouseController = new MouseController(addTitleButton, titleInputBox);
  const proxyClient = new ProxyClient(todosView, mouseController);

  proxyClient.start();
};

window.onload = main;
