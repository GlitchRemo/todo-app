const { TodoList } = require("./todo-list");

class TodoLists {
  #lists;
  #listCount;

  constructor(todoLists) {
    this.#lists = todoLists || [];
    this.#listCount = (this.#lists.at(-1) || {}).id || 0;
  }

  #generateId() {
    this.#listCount++;
    return this.#listCount;
  }

  add(title) {
    const listId = this.#generateId();
    const newList = new TodoList(title, listId);
    this.#lists.push(newList);
  }

  addTodo({ listId, description, isDone }) {
    this.#lists.find((todo) => todo.id === listId).add(description, isDone);
  }

  deleteTodo(listId, todoId) {
    this.#lists.find((todo) => todo.id === listId).delete(todoId);
  }

  toggleDoneStatus({ listId, todoId, isDone }) {
    this.#lists
      .find((list) => list.id === listId)
      .toggleDoneStatus(todoId, isDone);
  }

  sortListBy(listId, type) {
    const list = this.#lists.find((list) => list.id === listId);
    list.sortListBy(type);
  }

  getDetails() {
    return this.#lists.map((list) => list.getDetails());
  }
}

module.exports = { TodoLists };
