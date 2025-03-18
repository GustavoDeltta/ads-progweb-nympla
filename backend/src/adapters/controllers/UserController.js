const UserService = require("../../services/UserService");


async function getAllUsers(req, res) {
  
  const service = new UserService(null);
  const data = await service.getAllUsers();

  res.json(data);

}

module.exports = { getAllUsers };
