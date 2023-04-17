const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const { createToken } = require("../auth/jwtauth");

async function getUser(req, res) {
  const findUser = await prisma.user.findMany();
  if (!findUser) {
    return res.status(404).json({ sucess: false, message: "cannot find user", data: [] });
  }
  return res.status(200).json({ sucess: true, message: "success get all user", data: findUser });
}
async function getUserById(req, res) {
  const { id } = req.params;
  const findUser = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!findUser) {
    return res.status(404).json({ sucess: false, message: "cannot find user", data: [] });
  }
  return res.status(200).json({ sucess: true, message: "success get user", data: findUser });
}
async function createUser(req, res) {
  const { email, nama_user, role, password, foto } = req.body;
  const salt = 10;
  const encrypted = await bcrypt.hash(password, salt);
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user) {
    return res.status(400).json({ sucess: false, message: "user already exist", data: { nama_user, email, role } });
  }
  const createUser = await prisma.user.create({
    data: { email, nama_user, role, password: encrypted, foto: req.files[0].destination + req.files[0].filename },
  });
  if (!createUser) {
    return res.status(400).json({ sucess: false, message: "cannot create user", data: { nama_user, email, role } });
  }
  return res.status(200).json({ sucess: true, message: "success create new user", data: { nama_user, email, role } });
}

async function updateUser(req, res) {
  const { id } = req.params;
  const payload = req.body;
  const salt = 10;
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!user) {
    return res.status(404).json({ sucess: false, message: "user not found", data: [] });
  }
  const updateUser = await prisma.user.update({
    where: {
      id: parseInt(id),
    },
    data: {
      nama_user: payload.nama_user ? payload.nama_user : user.nama_user,
      foto: req.files ? req.files[0].destination + req.files[0].filename : user.foto,
      email: payload.email ? payload.email : user.email,
      password: payload.password ? await bcrypt.hash(payload.password, salt) : user.password,
      role: payload.role ? payload.role : user.role,
    },
  });
  if (!updateUser) {
    return res.status(500).json({ sucess: false, message: "cannot update user", data: payload });
  }
  return res.status(200).json({ sucess: true, message: "success update user", data: payload });
}
async function deleteUser(req, res) {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!user) {
    return res.status(404).json({ sucess: false, message: "user not found", data: [] });
  }
  const deleteUser = await prisma.user.delete({
    where: {
      id: parseInt(id),
    },
  });
  if (!deleteUser) {
    return res.status(500).json({ sucess: false, message: "cannot delete user" });
  }
  return res.status(200).json({ sucess: true, message: "success delete user", data: user });
}

// User login and sign in
async function login(req, res) {
  const { email, password } = req.body;
  const findUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!findUser) {
    return res.status(404).json({ sucess: false, message: "user not found, please sign in / create user", data: [] });
  }
  const matchPassword = await bcrypt.compare(password, findUser.password);
  if (!matchPassword) return res.status(401).json({ sucess: false, message: "wrong password, try again", data: [] });
  const token = createToken(findUser);

  return res.status(200).json({ sucess: true, message: "success login", data: findUser, token: token });
}

async function signIn(req, res) {
  res.status(200).json({ message: "accessing user sign in method" });
}

module.exports = {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
  signIn,
};
