class TodoList {
  #id;
  #title;
  #todos;
  #sortBy;

  constructor({ todoId, title, tasks, sortBy }) {
    this.#id = todoId;
    this.#title = title;
    this.#todos = tasks;
    this.#sortBy = sortBy || {};
  }

  setSortBy(type) {
    this.#sortBy = type;
  }

  #sortedTodos() {
    return this.#todos.toSorted((a, b) =>
      a.description.toLowerCase() < b.description.toLowerCase() ? -1 : 1
    );
  }

  #groupedTodos() {
    return this.#todos.toSorted((a, b) =>
      a.isDone === false && b.isDone === true ? -1 : 1
    );
  }

  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  get sortBy() {
    return this.#sortBy;
  }

  get todos() {
    if (this.#sortBy.alphabetic) return this.#sortedTodos();
    if (this.#sortBy.status) return this.#groupedTodos();
    return this.#todos;
  }
}

class TodoLists {
  #todoLists;

  constructor(todoLists) {
    this.#todoLists = todoLists;
  }

  setSortType(listId, type) {
    const todoList = this.#todoLists.find((list) => list.id === listId);
    todoList.setSortBy(type);
  }

  get todosData() {
    return this.#todoLists.map((todoList) => ({
      todoId: todoList.id,
      tasks: todoList.todos,
      title: todoList.title,
      sortBy: todoList.sortBy,
    }));
  }
}

const initialize = (todosData) => {
  console.log(todosData);
  const todoLists = todosData.map((todoList) => new TodoList(todoList));
  return new TodoLists(todoLists);
};
