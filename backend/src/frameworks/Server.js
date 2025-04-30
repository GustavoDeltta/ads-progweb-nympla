const express = require("express");
const cors = require("cors");
const UserRoutes = require("../Routes/UserRoutes");
const EventsRoutes = require("../Routes/EventsRoutes");
const AuthRoutes = require("../Routes/AuthRoutes");
const SubscriptionsRoutes = require("../Routes/SubscriptionsRoutes");

const server = express();
const PORT = 8080;

server.use(express.json());
server.use(cors({
  origin: 'http://127.0.0.1:5500'
}));
server.use(UserRoutes);
server.use(EventsRoutes);
server.use(AuthRoutes);
server.use(SubscriptionsRoutes);

server.listen(PORT, () => {
  console.log("Server ON!");
});
