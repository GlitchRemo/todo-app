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
    .writeHead(201, { "Content-Type": "application/json" })
    .end(JSON.stringify(request.todosController.getTodos()));
};

const handlePostTodoRequest = (request, response) => {
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

const handlePostTaskRequest = (request, response) => {
  let body = "";

  request.on("data", (chunk) => {
    body += chunk;
  });

  request.on("end", () => {
    const { todoId, description } = JSON.parse(body);
    request.todosController.addTask({ todoId, description }, () => {
      response.statusCode = 204;
      response.end();
    });
  });
};

const handlePatchTaskRequest = (request, response) => {
  let body = "";

  request.on("data", (chunk) => {
    body += chunk;
  });

  request.on("end", () => {
    const { todoId, taskId, isDone } = JSON.parse(body);
    request.todosController.markOrUnmarkTask({ todoId, taskId, isDone }, () => {
      response.statusCode = 204;
      response.end();
    });
  });
};

const handleDeleteTaskRequest = (request, response) => {
  let body = "";

  request.on("data", (chunk) => {
    body += chunk;
  });

  request.on("end", () => {
    const { todoId, taskId } = JSON.parse(body);
    request.todosController.deleteTask({ todoId, taskId }, () => {
      response.statusCode = 204;
      response.end();
    });
  });
};

module.exports = {
  handleMethodNotAllowed,
  handlePageNotFound,
  handleDeleteTaskRequest,
  handlePatchTaskRequest,
  handlePostTaskRequest,
  handlePostTodoRequest,
  redirectToHomepage,
  sendTodos,
  serveStaticPage,
};
