const { TodoList } = require("./todo-list");
const { TodoLists } = require("./todo-lists");

const createList = ({ listId, title, todos, sortBy }) => {
  const todoList = new TodoList(title, listId, sortBy);

  todos.forEach(({ description, isDone }) => todoList.add(description, isDone));

  return todoList;
};

const initialize = (todosData) => {
  return new TodoLists(todosData.map(createList));
};

module.exports = { initialize };
