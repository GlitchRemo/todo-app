class MouseController {
  #addButtonElement;
  #inputboxElement;

  constructor(addButtonElement, inputboxElement) {
    this.#addButtonElement = addButtonElement;
    this.#inputboxElement = inputboxElement;
  }

  #resetInputBox() {
    this.#inputboxElement.value = "";
  }

  onNewTodo(listener) {
    this.#addButtonElement.onclick = () => {
      const title = this.#inputboxElement.value;
      if (!title.trim()) return;

      this.#resetInputBox();
      listener(title);
    };
  }
}
