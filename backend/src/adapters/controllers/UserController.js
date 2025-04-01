const database = require("../../frameworks/Database");
const UserService = require("../../services/UserService");
const UserRepository = require("../repositories/UserRepository");
const jwt = require("jsonwebtoken");

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
  const service = new UserService(userRepository);
  const replyService = await service.registerUser(req.body);
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
    return res.status(401).json({ error: replyService.error });  
  }

  const payload = {
    userId: replyService.id,
    userRole: replyService.role
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn:"5m"});
  res.status(200).json({token: token});
}

async function profileUser(req, res) {
  res.json("Bem vindo! Você está autenticado.");
}

module.exports = { getAllUsers, registerUser, loginUser, profileUser };
