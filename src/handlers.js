const fs = require("fs");
const { getHeaders } = require("./headers");

const handleMethodNotAllowed = (_, response) => {
  response.statusCode = 405;
  response.end("Method not allowed");
};

const handlePageNotFound = (request, response) => {
  response.statusCode = 404;
  response.end(`${request.url} Not Found`);
};

const handleMisdirectedRequest = (_, response) => {
  response.statusCode = 421;
  response.end("Misdirected Response");
};

const resolveFilePath = (url) => {
  return `./public${url}`;
};

const sendResponse = (request, response, content) => {
  const headers = getHeaders(request.url);

  Object.entries(headers).forEach(([name, value]) =>
    response.setHeader(name, value)
  );

  response.end(content);
};

const redirectToHomepage = (_, response) => {
  response.writeHead(303, { location: "/index.html" }).end();
};

const serveStaticPage = (request, response) => {
  if (request.url.includes(".."))
    return handleMisdirectedRequest(request, response);

  const filePath = resolveFilePath(request.url);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      handlePageNotFound(request, response);
      return;
    }

    sendResponse(request, response, content);
  });
};

const sendTodos = (request, response) => {
  response
    .writeHead(200, { "Content-Type": "application/json" })
    .end(JSON.stringify(request.todosController.getTodos()));
};

const addTodoList = (request, response) => {
  let body = "";

  request.on("data", (chunk) => {
    body += chunk;
  });

  request.on("end", () => {
    const { title } = JSON.parse(body);
    request.todosController.addTodo(title, () => {
      response.statusCode = 204;
      response.end();
    });
  });
};

const addTodo = (request, response) => {
  let body = "";

  request.on("data", (chunk) => {
    body += chunk;
  });

  request.on("end", () => {
    const { listId, description } = JSON.parse(body);
    request.todosController.addTask({ listId, description }, () => {
      response.statusCode = 204;
      response.end();
    });
  });
};

const toggleDoneStatus = (request, response) => {
  let body = "";

  request.on("data", (chunk) => {
    body += chunk;
  });

  request.on("end", () => {
    const { listId, todoId, isDone } = JSON.parse(body);
    request.todosController.markOrUnmarkTask({ listId, todoId, isDone }, () => {
      response.statusCode = 204;
      response.end();
    });
  });
};

const deleteTodo = (request, response) => {
  let body = "";

  request.on("data", (chunk) => {
    body += chunk;
  });

  request.on("end", () => {
    const { listId, todoId } = JSON.parse(body);
    request.todosController.deleteTask({ listId, todoId }, () => {
      response.statusCode = 204;
      response.end();
    });
  });
};

const sortTodoList = (request, response) => {
  let body = "";

  request.on("data", (chunk) => {
    body += chunk;
  });

  request.on("end", () => {
    const { listId, type } = JSON.parse(body);
    request.todosController.updateSort({ listId, type }, () => {
      response.statusCode = 204;
      response.end();
    });
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
  serveStaticPage,
  sortTodoList,
};
