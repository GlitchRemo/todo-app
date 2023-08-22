const main = () => {
  const todosContainer = document.querySelector("#todos-container");
  const titleInputBox = document.querySelector(".input-box");
  const addTitleButton = document.querySelector("#add-button");

  const todosView = new TodosView(
    addTitleButton,
    titleInputBox,
    todosContainer
  );
  const proxyClient = new ProxyClient(todosView);

  proxyClient.start();
};

window.onload = main;
