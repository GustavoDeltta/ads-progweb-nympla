const { Router } = require("express");
const UserController = require("../adapters/controllers/UserController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const AuthRoutes = Router();

AuthRoutes.post("/auth/profile", authMiddleware, roleMiddleware("user"), UserController.profileUser);   
AuthRoutes.post("/auth/dashboard", authMiddleware, roleMiddleware("admin"), UserController.adminUser);

module.exports = AuthRoutes;