const { Router } = require("express");
const UserController = require("../adapters/controllers/UserController");
const Authenticate = require("../frameworks/AuthenticateToken");

const AuthRoutes = Router();

AuthRoutes.post("/auth/profile", Authenticate, UserController.profileUser);

module.exports = AuthRoutes;