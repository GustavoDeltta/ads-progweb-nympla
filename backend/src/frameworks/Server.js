const express = require("express");
const UserRoutes = require("../Routes/UserRoutes");
const EventsRoutes = require("../Routes/EventsRoutes");
const AuthRoutes = require("../Routes/AuthRoutes");

const server = express();
const PORT = 8080;

server.use(express.json());
server.use(UserRoutes);
server.use(EventsRoutes);
server.use(AuthRoutes);

server.listen(PORT, () => {
  console.log("Server ON!");
});
