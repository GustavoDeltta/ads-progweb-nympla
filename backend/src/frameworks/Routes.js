const { Router } = require("express");
const UserController =
  require("../adapters/controllers/UserController");

const routes = Router();

routes.get("/user/all", UserController.getAllUsers);
routes.post("/user/register", UserController.registerUser);
routes.post("/user/login", UserController.loginUser);

module.exports = routes;
