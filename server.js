const http = require("node:http");
const { createRouter } = require("./src/router");

const logRequest = (request) => console.log(">", request.method, request.url);

const setupServer = (router) => {
  const server = http.createServer((req, res) => {
    logRequest(req);

    router.route(req, res);
  });

  const PORT = 8000;
  server.listen(PORT, () => console.log("Server is listening to PORT:", PORT));
};

const main = () => {
  const router = createRouter();
  setupServer(router);
};

main();
