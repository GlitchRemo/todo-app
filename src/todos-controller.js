const { TodoList } = require("./todo-list");
const { TodoLists } = require("./todo-lists");

class TodosController {
  #todoLists;
  #todosStorage;

  constructor(todoLists, todosStorage) {
    this.#todoLists = todoLists;
    this.#todosStorage = todosStorage;
  }

  addTodoList(title, onSave) {
    this.#todoLists.add(title);
    this.#todosStorage.update(this.#todoLists.getDetails(), onSave);
  }

  addTodo(todo, onSave) {
    this.#todoLists.addTodo(todo);
    this.#todosStorage.update(this.#todoLists.getDetails(), onSave);
  }

  deleteTodo({ listId, todoId }, onSave) {
    this.#todoLists.deleteTodo(listId, todoId);
    this.#todosStorage.update(this.#todoLists.getDetails(), onSave);
  }

  toggleDoneStatus({ listId, todoId, isDone }, onSave) {
    this.#todoLists.toggleDoneStatus({ listId, todoId, isDone });
    this.#todosStorage.update(this.#todoLists.getDetails(), onSave);
  }

  updateSort({ listId, type }, onSave) {
    this.#todoLists.sortListBy(listId, type);
    this.#todosStorage.update(this.#todoLists.getDetails(), onSave);
  }

  getTodosDetails() {
    return this.#todoLists.getDetails();
  }
}

const createList = ({ listId, title, todos, sortBy }) => {
  const todoList = new TodoList(title, listId, sortBy);

  todos.forEach(({ description, isDone }) => todoList.add(description, isDone));

  return todoList;
};

const initialize = (todosData) => {
  return new TodoLists(todosData.map(createList));
};

module.exports = { TodosController, initialize };
