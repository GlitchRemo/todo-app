const fs = require("fs");
const { getHeaders } = require("./headers");

class RequestHandler {
  #todos;

  constructor(todos) {
    this.#todos = todos;
  }

  handleMethodNotAllowed(_, response) {
    response.statusCode = 405;
    response.end("Method not allowed");
  }

  handlePageNotFound(request, response) {
    response.statusCode = 404;
    response.end(`${request.url} Not Found`);
  }

  handleMisdirectedRequest(_, response) {
    response.statusCode = 421;
    response.end("Misdirected Response");
  }

  resolveFilePath(url) {
    return `./public${url}`;
  }

  sendResponse(request, response, content) {
    const headers = getHeaders(request.url);

    Object.entries(headers).forEach(([name, value]) =>
      response.setHeader(name, value)
    );

    response.end(content);
  }

  redirectToHomepage(_, response) {
    response.writeHead(303, { location: "/index.html" }).end();
  }

  serveStaticPage(request, response) {
    if (request.url.includes(".."))
      return this.handleMisdirectedRequest(request, response);

    const filePath = this.resolveFilePath(request.url);

    fs.readFile(filePath, (err, content) => {
      if (err) {
        this.handlePageNotFound(request, response);
        return;
      }

      this.sendResponse(request, response, content);
    });
  }

  sendTodos(request, response) {
    response
      .writeHead(201, { "Content-Type": "application/json" })
      .end(JSON.stringify(this.#todos.getDetails()));
  }

  handlePostTodoRequest(request, response) {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
    });

    request.on("end", () => {
      const { title } = JSON.parse(body);
      this.#todos.addTodo(title);
      response.statusCode = 201;
      response.end();
    });
  }

  handlePostTaskRequest(request, response) {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
    });

    request.on("end", () => {
      const { todoId, description } = JSON.parse(body);
      this.#todos.addTask({ todoId, description });
      response.statusCode = 201;
      response.end();
    });
  }
}

module.exports = { RequestHandler };
