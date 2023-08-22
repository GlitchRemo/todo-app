const { TodoList } = require("./todo-list");
const { TodoLists } = require("./todo-lists");

class TodosController {
  #todoLists;
  #todosStorage;

  constructor(todos, todosStorage) {
    this.#todoLists = todos;
    this.#todosStorage = todosStorage;
  }

  addTodo(title, onSave) {
    this.#todoLists.addTodo(title);
    this.#todosStorage.saveTodos(this.#todoLists.getDetails(), onSave);
  }

  addTask(task, onSave) {
    this.#todoLists.addTask(task);
    this.#todosStorage.saveTodos(this.#todoLists.getDetails(), onSave);
  }

  markOrUnmarkTask({ todoId, taskId, isDone }, onSave) {
    this.#todoLists.markOrUnmarkTask({ todoId, taskId, isDone });
    this.#todosStorage.saveTodos(this.#todoLists.getDetails(), onSave);
  }

  deleteTask({ listId, todoId }, onSave) {
    this.#todoLists.deleteTask(listId, todoId);
    this.#todosStorage.saveTodos(this.#todoLists.getDetails(), onSave);
  }

  updateSort({ todoId, type }, onSave) {
    this.#todoLists.sortTodoBy(todoId, type);
    this.#todosStorage.saveTodos(this.#todoLists.getDetails(), onSave);
  }

  getTodos() {
    return this.#todoLists.getDetails();
  }
}

const createList = ({ listId, title, todos, sortBy }) => {
  const todoList = new TodoList(title, listId, sortBy);

  todos.forEach(({ description, isDone }) =>
    todoList.addTask(description, isDone)
  );

  return todoList;
};

const initialize = (todosData) => {
  return new TodoLists(todosData.map(createList));
};

module.exports = { TodosController, initialize };
