const { TodoList } = require("./todo-list");

class TodoLists {
  #lists;
  #listCount;

  constructor(todoLists) {
    this.#listCount = 0;
    this.#lists = todoLists || [];
  }

  #generateId() {
    this.#listCount++;
    return this.#listCount;
  }

  addTodo(title) {
    const listId = this.#generateId();
    const newList = new TodoList(title, listId);
    this.#lists.push(newList);
  }

  addTask({ listId, description, isDone }) {
    this.#lists.find((todo) => todo.id === listId).addTask(description, isDone);
  }

  deleteTask(listId, todoId) {
    this.#lists.find((todo) => todo.id === listId).deleteTask(todoId);
  }

  markOrUnmarkTask({ listId, todoId, isDone }) {
    this.#lists
      .find((list) => list.id === listId)
      .markOrUnmarkTask(todoId, isDone);
  }

  sortTodoBy(listId, type) {
    const list = this.#lists.find((list) => list.id === listId);
    list.sortTodoBy(type);
  }

  getDetails() {
    return this.#lists.map((todo) => todo.getDetails());
  }
}

module.exports = { TodoLists };
