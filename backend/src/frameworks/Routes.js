const { Router } = require("express");
const UserController =
  require("../adapters/controllers/UserController");

const routes = Router();

routes.get("/user/all",
  UserController.getAllUsers);

module.exports = routes;
