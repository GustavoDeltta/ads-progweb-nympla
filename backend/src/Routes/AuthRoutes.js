const { Router } = require("express");
const UserController = require("../adapters/controllers/UserController");
const Authenticate = require("../frameworks/AuthenticateToken");

const AuthRoutes = Router();

AuthRoutes.post("/auth/profile", Authenticate, UserController.profileUser);
AuthRoutes.post("/auth/dashboard", Authenticate, UserController.adminUser);

module.exports = AuthRoutes;