const express = require("express");
const cors = require("cors");
const cookies = require("cookie-parser");
const UserRoutes = require("../Routes/UserRoutes");
const EventsRoutes = require("../Routes/EventsRoutes");
const AuthRoutes = require("../Routes/AuthRoutes");

const server = express();
const PORT = 8080;

server.use(express.json());
server.use(cors({
  origin: 'http://127.0.0.1:5500', // colocar rota do frontend
  credentials: true
}));
server.use(cookies());
server.use(UserRoutes);
server.use(EventsRoutes);
server.use(AuthRoutes);

server.listen(PORT, () => {
  console.log("Server ON!");
});
