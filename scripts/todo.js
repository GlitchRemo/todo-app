class Todo {
  #tasks;
  #id;
  #sortBy;
  #title;
  #taskId;

  constructor({ title, id }) {
    this.#title = title;
    this.#id = id;
    this.#taskId = 0;
    this.#tasks = [];
    this.#sortBy = { alphabetic: false, date: true, status: false };
  }

  #generateId() {
    this.#taskId++;
    return this.#taskId;
  }

  sortTodoBy({ alphabetic, status, date }) {
    if (alphabetic) {
      this.#sortBy = { alphabetic: true, date: false, status: false };
      return;
    }

    if (status) {
      this.#sortBy = { alphabetic: false, date: false, status: true };
      return;
    }

    if (date) {
      this.#sortBy = { alphabetic: false, date: true, status: false };
      return;
    }
  }

  addTask(description) {
    const taskId = this.#generateId();
    const task = new Task(description, taskId);
    this.#tasks.push(task);
  }

  markOrUnmarkTask(id, isDone) {
    this.#tasks.find((task) => task.id === id).setStatus(isDone);
  }

  #getSortedTasks() {
    return this.#tasks.toSorted((a, b) =>
      a.description.toLowerCase() < b.description.toLowerCase() ? -1 : 1
    );
  }

  #getGroupedTasks() {
    return this.#tasks.toSorted((a, b) =>
      a.isDone() === false && b.isDone() === true ? -1 : 1
    );
  }

  getTasks() {
    if (this.#sortBy.alphabetic) return this.#getSortedTasks();
    if (this.#sortBy.status) return this.#getGroupedTasks();
    return this.#tasks;
  }

  get title() {
    return this.#title;
  }

  get id() {
    return this.#id;
  }

  deleteTask(id) {
    const indexOfTaskToDelete = this.#tasks.findIndex((task) => task.id === id);
    this.#tasks.splice(indexOfTaskToDelete, 1);
  }

  getDetails() {
    const tasks = this.getTasks().map((task) => task.getDetails());
    return {
      todoId: this.#id,
      title: this.#title,
      sortBy: this.#sortBy,
      tasks,
    };
  }
}
