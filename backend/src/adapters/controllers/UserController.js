const database = require("../../frameworks/Database");
const UserService = require("../../services/UserService");
const UserRepository = require("../repositories/UserRepository");

const userRepository = new UserRepository(database);

async function getAllUsers(req, res) {
  const service = new UserService(userRepository);
  const replyService = await service.getAllUsers();

  if(replyService.error){
    res.status(500).json({ error: replyService.error });  
  }
  res.status(200).json({ users: replyService });
}

async function registerUser(req, res) {
  const data = req.body;
  const service = new UserService(userRepository);
  const replyService = await service.registerUser(data);
  if(replyService.error){
    res.status(500).json({ error: replyService.error });  
  }
  res.status(201).json({ status: replyService });
}

async function loginUser(req, res) {
  const data = req.body;
  const service = new UserService(userRepository);
  const replyService = await service.authUser(data);

  if(replyService.error){
    res.status(500).json({ error: replyService.error });  
  }
  res.status(201).json(replyService);
}

module.exports = { getAllUsers, registerUser, loginUser };
