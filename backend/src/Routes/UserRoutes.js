const { Router } = require("express");
const UserController = require("../adapters/controllers/UserController");

const UserRoutes = Router();

UserRoutes.get("/user/all", UserController.getAllUsers);
UserRoutes.post("/user/register", UserController.registerUser);
UserRoutes.post("/user/login", UserController.loginUser);

module.exports = UserRoutes;
