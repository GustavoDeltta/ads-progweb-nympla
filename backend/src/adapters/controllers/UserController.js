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
    return res.status(replyService.code).json({ error: replyService.error });  
  }

  const payload = {
    userId: replyService.user.id,
    userRole: replyService.user.role
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn:"5m"});

  let redirect = "";
  if(replyService.user.role === "admin"){
    redirect = "dashboard.html";
  }else{
    redirect = "profile.html";
  }

  res.cookie('token', token, {
    httpOnly: true,
    secure: false, // só HTTPS em produção
    sameSite: 'lax',
    maxAge: 5 * 60 * 1000 // 5 minutos
  });

  res.status(200).json({ redirect });
}

async function profileUser(req, res) {
  res.json("Bem vindo! Você está autenticado.");
}

async function adminUser(req, res) {
  res.json("Bem vindo! Você está autenticado.");
}

module.exports = { getAllUsers, registerUser, loginUser, profileUser, adminUser };
