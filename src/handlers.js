const handleMethodNotAllowed = (_, response) => {
  response.statusCode = 405;
  response.end("Method not allowed");
};

const handlePageNotFound = (request, response) => {
  response.statusCode = 404;
  response.end(`${request.url} Not Found`);
};

const redirectToHomepage = (_, response) => {
  response.writeHead(303, { location: "/index.html" }).end();
};

const sendTodos = (request, response) => {
  const { todosController } = request.app;

  response
    .writeHead(200, { "Content-Type": "application/json" })
    .end(JSON.stringify(todosController.getTodosDetails()));
};

const addTodoList = (request, response) => {
  const { todosController } = request.app;
  const { title } = request.body;

  todosController.addTodoList(title, () => {
    response.statusCode = 201;
    response.end();
  });
};

const addTodo = (request, response) => {
  const { todosController } = request.app;
  const { description } = request.body;
  const { listId } = request.params;

  todosController.addTodo({ listId, description }, () => {
    response.statusCode = 201;
    response.end();
  });
};

const toggleDoneStatus = (request, response) => {
  const { todosController } = request.app;
  const { isDone } = request.body;
  const { listId, todoId } = request.params;

  todosController.toggleDoneStatus({ listId, todoId, isDone }, () => {
    response.statusCode = 204;
    response.end();
  });
};

const deleteTodo = (request, response) => {
  const { todosController } = request.app;
  const { listId, todoId } = request.params;

  todosController.deleteTodo({ listId, todoId }, () => {
    response.statusCode = 204;
    response.end();
  });
};

const sortTodoList = (request, response) => {
  const { todosController } = request.app;
  const { type } = request.body;
  const { listId } = request.params;

  todosController.updateSort({ listId, type }, () => {
    response.statusCode = 204;
    response.end();
  });
};

module.exports = {
  handleMethodNotAllowed,
  handlePageNotFound,
  deleteTodo,
  toggleDoneStatus,
  addTodo,
  addTodoList,
  redirectToHomepage,
  sendTodos,
  sortTodoList,
};
