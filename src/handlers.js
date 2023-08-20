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

module.exports = {
  redirectToHomepage,
  handleMethodNotAllowed,
  serveStaticPage,
};
