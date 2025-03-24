const express = require("express");
const routes = require("./Routes");

const server = express();
const PORT = 8080;

server.use(express.json());
server.use(routes);

server.listen(PORT, () => {
  console.log("Server ON!");
});
