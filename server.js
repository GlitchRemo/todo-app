const http = require("node:http");
const fs = require("node:fs");
const { createRouter } = require("./src/router");

const logRequest = (request) => console.log(">", request.method, request.url);

const setupServer = () => {
  const server = http.createServer((req, res) => {
    logRequest(req);

    const router = createRouter();
    router.route(req, res);
  });

  const PORT = 8000;
  server.listen(PORT, () => console.log("Server is listening to PORT:", PORT));
};

const main = () => {
  setupServer();
};

main();
