const database = require("../../frameworks/Database");
const UserService = require("../../services/UserService");
const UserRepository = require("../repositories/UserRepository");

const userRepository = new UserRepository(database);

async function getAllUsers(req, res) {
  const service = new UserService(userRepository);
  const users = await service.getAllUsers();

  res.status(200).json(users);
}

async function registerUser(req, res) {
  const data = req.body;
  const service = new UserService(userRepository);
  const replyService = await service.registerUser(data);

  res.status(201).json({ status: replyService });
}

async function loginUser(req, res) {
  
}

module.exports = { getAllUsers, registerUser, loginUser };
