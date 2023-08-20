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

const resolveFilePath = (url) => `./public${url}`;

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
  const todos = [
    {
      todoId: 1,
      title: "Office",
      tasks: [
        { taskId: 1, description: "ab todo", isDone: true },
        { taskId: 2, description: "c todo", isDone: false },
      ],
    },
    {
      todoId: 2,
      title: "Personal",
      tasks: [
        { taskId: 3, description: "c todo", isDone: false },
        { taskId: 2, description: "d todo", isDone: true },
      ],
    },
  ];

  response
    .writeHead(201, { "Content-Type": "application/json" })
    .end(JSON.stringify(todos));
};

module.exports = {
  redirectToHomepage,
  handleMethodNotAllowed,
  serveStaticPage,
  sendTodos,
};
