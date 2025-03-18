const database = require("../../frameworks/Database");
const UserService = require("../../services/UserService");
const UserRepository = require("../repositories/UserRepository");

const userRepository = new UserRepository(database);

async function getAllUsers(req, res) {
  const service = new UserService(userRepository);
  const users = await service.getAllUsers();

  res.json(users);
}

module.exports = { getAllUsers };
