const main = () => {
  const todosContainer = document.querySelector("#todos-container");
  const titleInputBox = document.querySelector(".input-box");
  const addTitleButton = document.querySelector(".add-button");

  const view = new View(addTitleButton, titleInputBox, todosContainer);
  const proxyClient = new ProxyClient(view);

  proxyClient.start();
};

window.onload = main;
