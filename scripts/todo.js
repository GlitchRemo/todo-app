class Todo {
  #tasks;
  #id;
  #orderType;
  #title;
  #taskId;

  constructor({ title, id }) {
    this.#title = title;
    this.#id = id;
    this.#taskId = 0;
    this.#tasks = [];
    this.#orderType = { alphabetic: false, date: true, status: false };
  }

  #generateId() {
    this.#taskId++;
    return this.#taskId;
  }

  sortTodoBy({ alphabetic, status, date }) {
    if (alphabetic) {
      this.#orderType = { alphabetic: true, date: false, status: false };
      return;
    }

    if (status) {
      this.#orderType = { alphabetic: false, date: false, status: true };
      return;
    }

    if (date) {
      this.#orderType = { alphabetic: false, date: true, status: false };
      return;
    }
  }

  addTask(description) {
    const taskId = this.#generateId();
    const task = new Task(description, taskId);
    this.#tasks.push(task);
  }

  markOrUnmarkTask(id) {
    this.#tasks.find((task) => task.id === id).toggleDoneStatus();
  }

  #getSortedTasks() {
    return this.#tasks.toSorted((a, b) =>
      a.description < b.description ? -1 : 1
    );
  }

  #getGroupedTasks() {
    return this.#tasks.toSorted((a, b) =>
      a.isDone() === false && b.isDone() === true ? -1 : 1
    );
  }

  getTasks() {
    if (this.#orderType.alphabetic) return this.#getSortedTasks();
    if (this.#orderType.status) return this.#getGroupedTasks();
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
}
