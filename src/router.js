const {
  redirectToHomepage,
  handleGetCommentsRequest,
  handlePostCommentRequest,
  handleGuestBookRequest,
  handleLoginRequest,
  serveStaticPage,
  handleMethodNotAllowed,
  sendUserCredential,
  handleLogoutRequest,
} = require("./handlers");

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

    console.log(router.handler);
    router.handler(request, response);
  }
}

const createRouter = () => {
  const router = new Router();

  router.addHandler("GET", "^/$", redirectToHomepage);
  router.addHandler("GET", "^.*$", serveStaticPage);
  router.addHandler("ANY", "^.*$", handleMethodNotAllowed);

  return router;
};

module.exports = { createRouter };
