class View {
  #todosContainer;
  #listeners;
  #addButtonElement;
  #inputboxElement;

  constructor(addButtonElement, inputboxElement, todosContainer) {
    this.#addButtonElement = addButtonElement;
    this.#inputboxElement = inputboxElement;
    this.#todosContainer = todosContainer;
    this.#listeners = {};
  }

  on(eventName, listener) {
    this.#listeners[eventName] = listener;
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

  #createAlphabeticSortButton(todoId) {
    const alphabeticButton = document.createElement("input");

    alphabeticButton.type = "button";
    alphabeticButton.value = "A-Z";

    alphabeticButton.onclick = () => {
      this.#listeners.sort(todoId, { alphabetic: true });
    };

    return alphabeticButton;
  }

  #createStatusSortButton(todoId) {
    const statusButton = document.createElement("input");

    statusButton.type = "button";
    statusButton.value = "Status";

    statusButton.onclick = () => {
      this.#listeners.sort(todoId, { status: true });
    };

    return statusButton;
  }

  #createDateSortButton(todoId) {
    const dateButton = document.createElement("input");

    dateButton.type = "button";
    dateButton.value = "Date";

    dateButton.onclick = () => {
      this.#listeners.sort(todoId, { date: true });
    };

    return dateButton;
  }

  #createAddTaskButton() {
    const addTaskButton = document.createElement("input");

    addTaskButton.type = "button";
    addTaskButton.value = "Add Task";

    return addTaskButton;
  }

  #createRemoveButton({ todoId }, listId) {
    const deleteButton = document.createElement("input");

    deleteButton.type = "button";
    deleteButton.value = "remove";

    deleteButton.onclick = () => {
      this.#listeners.removeTask(listId, todoId);
    };

    return deleteButton;
  }

  #createTaskDescription({ todoId, description, isDone }, listId) {
    const descriptionElement = document.createElement("section");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const descriptionTextElement = document.createElement("label");
    descriptionTextElement.innerText = description;
    descriptionElement.append(checkbox, descriptionTextElement);

    if (isDone) {
      checkbox.checked = true;
      descriptionTextElement.classList.add("strike");
    }

    checkbox.onchange = () => {
      this.#listeners.markTask(listId, todoId, !isDone);
    };

    return descriptionElement;
  }

  #createTaskElement(todo, listId) {
    const taskElement = document.createElement("section");

    const descriptionElement = this.#createTaskDescription(todo, listId);
    const removeButton = this.#createRemoveButton(todo, listId);
    taskElement.append(descriptionElement, removeButton);
    taskElement.classList.add("task");

    return taskElement;
  }

  #createTitleElement(title, todoId) {
    const titleElement = document.createElement("section");
    const sortButtons = document.createElement("section");
    const heading = document.createElement("h2");

    heading.innerText = title;
    titleElement.classList.add("flex");
    sortButtons.classList.add("flex");

    const statusSortButton = this.#createStatusSortButton(todoId);
    const alphabeticSortButton = this.#createAlphabeticSortButton(todoId);
    const dateSortButton = this.#createDateSortButton(todoId);

    sortButtons.append(statusSortButton, alphabeticSortButton, dateSortButton);
    titleElement.append(heading, sortButtons);

    return titleElement;
  }

  #createInputBox() {
    const inputBox = document.createElement("input");
    inputBox.classList.add("input-box");
    inputBox.type = "text";
    inputBox.placeholder = "Enter a task...";
    return inputBox;
  }

  #createInputSection(listId) {
    const inputSection = document.createElement("section");
    inputSection.classList.add("flex");

    const inputBox = this.#createInputBox();
    const addTaskButton = this.#createAddTaskButton();
    inputSection.append(inputBox, addTaskButton);

    addTaskButton.onclick = () => {
      const description = inputBox.value;
      if (!description.trim()) return;

      this.#listeners.addTask(listId, description);
    };

    return inputSection;
  }

  #createTodoSection({ title, listId, todos }) {
    const todoSection = document.createElement("article");
    const tasksSection = document.createElement("section");

    const titleElement = this.#createTitleElement(title, listId);
    const inputSection = this.#createInputSection(listId);

    todoSection.append(titleElement, inputSection);
    todoSection.classList.add("flex-column", "todo");
    tasksSection.classList.add("flex-column", "tasks");

    todos.forEach((todo) => {
      const todoElement = this.#createTaskElement(todo, listId);
      tasksSection.append(todoElement);
    });

    todoSection.appendChild(tasksSection);
    return todoSection;
  }

  #removeTodos() {
    [...this.#todosContainer.children].forEach((child) =>
      this.#todosContainer.removeChild(child)
    );
  }

  render(todosData) {
    this.#removeTodos();

    todosData.forEach((todoList) => {
      const todoElement = this.#createTodoSection(todoList);
      this.#todosContainer.prepend(todoElement);
    });
  }
}
