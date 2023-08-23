const express = require("express");
const { createRouter } = require("./src/router");

const main = () => {
  const app = express();

  const PORT = 8000;
  app.listen(PORT, () => console.log("Server is listening to PORT:", PORT));

  createRouter(app);
};

main();
