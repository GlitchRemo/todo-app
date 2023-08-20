class TodosView {
  #todosContainer;
  #listeners;

  constructor(todosContainer) {
    this.#todosContainer = todosContainer;
    this.#listeners = {};
  }

  on(eventName, listener) {
    this.#listeners[eventName] = listener;
  }

  #createAlphabeticSortButton(todoId) {
    const alphabeticButton = document.createElement("input");

    alphabeticButton.type = "button";
    alphabeticButton.value = "A-Z";

    alphabeticButton.onclick = () => {
      this.#listeners.alphabeticSort(todoId);
    };

    return alphabeticButton;
  }

  #createStatusSortButton(todoId) {
    const statusButton = document.createElement("input");

    statusButton.type = "button";
    statusButton.value = "Status";

    statusButton.onclick = () => {
      this.#listeners.statusSort(todoId);
    };

    return statusButton;
  }

  #createDateSortButton(todoId) {
    const dateButton = document.createElement("input");

    dateButton.type = "button";
    dateButton.value = "Date";

    dateButton.onclick = () => {
      this.#listeners.dateSort(todoId);
    };

    return dateButton;
  }

  #createAddTaskButton() {
    const addTaskButton = document.createElement("input");

    addTaskButton.type = "button";
    addTaskButton.value = "Add Task";

    return addTaskButton;
  }

  #createRemoveButton({ taskId }, todoId) {
    const deleteButton = document.createElement("input");

    deleteButton.type = "button";
    deleteButton.value = "remove";

    deleteButton.onclick = () => {
      this.#listeners.removeTask({ taskId, todoId });
    };

    return deleteButton;
  }

  #createTaskDescription({ taskId, description, isDone }, todoId) {
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
      this.#listeners.markTask({ taskId, todoId, isDone: !isDone });
    };

    return descriptionElement;
  }

  #createTaskElement(task, todoId) {
    const taskElement = document.createElement("section");

    const descriptionElement = this.#createTaskDescription(task, todoId);
    const removeButton = this.#createRemoveButton(task, todoId);
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

  #createInputSection(todoId) {
    const inputSection = document.createElement("section");
    inputSection.classList.add("flex");

    const inputBox = this.#createInputBox();
    const addTaskButton = this.#createAddTaskButton();
    inputSection.append(inputBox, addTaskButton);

    addTaskButton.onclick = () => {
      const description = inputBox.value;
      if (!description.trim()) return;

      this.#listeners.addTask({ description, todoId });
    };

    return inputSection;
  }

  #createTodoSection({ title, todoId, tasks }) {
    const todoSection = document.createElement("article");
    const tasksSection = document.createElement("section");

    const titleElement = this.#createTitleElement(title, todoId);
    const inputSection = this.#createInputSection(todoId);

    todoSection.append(titleElement, inputSection);
    todoSection.classList.add("flex-column", "todo");
    tasksSection.classList.add("flex-column", "tasks");

    tasks.forEach((task) => {
      const todoElement = this.#createTaskElement(task, todoId);
      tasksSection.appendChild(todoElement);
    });

    todoSection.appendChild(tasksSection);
    return todoSection;
  }

  #removeTodos() {
    [...this.#todosContainer.children].forEach((child) =>
      this.#todosContainer.removeChild(child)
    );
  }

  render(todos) {
    this.#removeTodos();

    todos.forEach((todo) => {
      const todoElement = this.#createTodoSection(todo);
      this.#todosContainer.appendChild(todoElement);
    });
  }
}
