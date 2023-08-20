const { RequestHandler } = require("./handlers");
const { Todos } = require("./todos");

class Router {
  #handlers;
  constructor() {
    this.#handlers = [];
  }

  addHandler(method, route, handler) {
    this.#handlers.push({ method, route, handler });
  }

  route(request, response) {
    const router = this.#handlers.find(({ method, route }) => {
      const routeRegex = new RegExp(route);
      return (
        routeRegex.test(request.url) &&
        (method === request.method || method === "ANY")
      );
    });

    router.handler(request, response);
  }
}

const createRouter = () => {
  const router = new Router();
  const todos = new Todos();
  const requestHandler = new RequestHandler(todos);

  router.addHandler("GET", "^/$", (req, res) =>
    requestHandler.redirectToHomepage(req, res)
  );

  router.addHandler("GET", "^/todos$", (req, res) =>
    requestHandler.sendTodos(req, res)
  );

  router.addHandler("POST", "^/todos$", (req, res) =>
    requestHandler.handlePostTodoRequest(req, res)
  );

  router.addHandler("POST", "^/todos/tasks$", (req, res) =>
    requestHandler.handlePostTaskRequest(req, res)
  );

  router.addHandler("GET", "^.*$", (req, res) =>
    requestHandler.serveStaticPage(req, res)
  );

  router.addHandler("ANY", "^.*$", (req, res) =>
    requestHandler.handleMethodNotAllowed(req, res)
  );

  return router;
};

module.exports = { createRouter };
