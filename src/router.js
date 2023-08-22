const {
  redirectToHomepage,
  sendTodos,
  handlePostTodoRequest,
  handlePostTaskRequest,
  handlePatchTaskRequest,
  handleDeleteTaskRequest,
  serveStaticPage,
  handleMethodNotAllowed,
  handleSortRequest,
} = require("./handlers");

class Router {
  #handlers;
  constructor() {
    this.#handlers = [];
  }

  addHandler(method, route, handler) {
    this.#handlers.push({ method, route, handler });
  }

  #isSameUrl(request, route) {
    const routeRegex = new RegExp(route);
    return routeRegex.test(request.url);
  }

  #isSameMethod(request, method) {
    return method === request.method || method === "ANY";
  }

  route(request, response) {
    const router = this.#handlers.find(({ method, route }) => {
      return (
        this.#isSameUrl(request, route) && this.#isSameMethod(request, method)
      );
    });

    router.handler(request, response);
  }
}

const createRouter = () => {
  const router = new Router();

  router.addHandler("GET", "^/$", (req, res) => redirectToHomepage(req, res));

  router.addHandler("GET", "^/todos$", (req, res) => sendTodos(req, res));

  router.addHandler("POST", "^/todos$", (req, res) =>
    handlePostTodoRequest(req, res)
  );

  router.addHandler("POST", "^/todos/tasks$", (req, res) =>
    handlePostTaskRequest(req, res)
  );

  router.addHandler("PATCH", "^/todos/tasks/task$", (req, res) =>
    handlePatchTaskRequest(req, res)
  );

  router.addHandler("PATCH", "^/todos/todo$", (req, res) =>
    handleSortRequest(req, res)
  );

  router.addHandler("DELETE", "^/todos/tasks$", (req, res) =>
    handleDeleteTaskRequest(req, res)
  );

  router.addHandler("GET", "^.*$", (req, res) => serveStaticPage(req, res));

  router.addHandler("ANY", "^.*$", (req, res) =>
    handleMethodNotAllowed(req, res)
  );

  return router;
};

module.exports = { createRouter };
