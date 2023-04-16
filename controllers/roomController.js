const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function getRooms(req, res) {
  const room = await prisma.kamar.findMany();
  if (!room) {
    return res.status(400).json({ success: false, message: "Cannot proceed request", data: [] });
  }
  return res.status(200).json({ success: true, message: "Success get all data", data: room });
}
async function getRoomById(req, res) {
  const { id } = req.params;
  const room = await prisma.kamar.findUnique({
    where: {
      id_kamar: parseInt(id),
    },
  });
  if (!room) {
    return res.status(404).json({ success: false, message: "Data not found", data: [] });
  }
  return res.status(200).json({ success: true, message: "Success get single data", data: room });
}
async function createRoom(req, res) {
  const { nomor_kamar, id_tipe_kamar } = req.body;
  const payload = req.body;
  if (typeof nomor_kamar !== "number" && typeof id_tipe_kamar !== "number") {
    return res.status(400).json({ sucess: false, message: "room number and type room id must be an integer", data: nomor_kamar });
  }
  const room = await prisma.kamar.findUnique({
    where: {
      nomor_kamar,
    },
  });
  if (room) {
    return res.status(400).json({ sucess: false, message: "room number already exist", data: nomor_kamar });
  }
  const id_room = await prisma.Tipe_Kamar.findUnique({
    where: {
      id: parseInt(id_tipe_kamar),
    },
  });
  if (!id_room) {
    return res.status(406).json({ sucess: false, message: "room id not found", data: { id_tipe: id_tipe_kamar } });
  }
  const createUser = await prisma.kamar.create({
    data: payload,
  });
  if (!createUser) {
    return res.status(400).json({ sucess: false, message: "cannot create user", data: nomor_kamar });
  }
  return res.status(200).json({ sucess: true, message: "success create new user", data: nomor_kamar });
}
async function updateRoom(req, res) {
  const { id } = req.params;
  const payload = req.body;
  const { nomor_kamar, id_tipe_kamar } = req.body;
  if (typeof nomor_kamar !== "number" && typeof id_tipe_kamar !== "number") {
    return res.status(400).json({ sucess: false, message: "room number and type room id must be an integer", data: nomor_kamar });
  }

  const findRoom = await prisma.kamar.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!findRoom) {
    return res.status(404).json({ success: false, message: "Data not found", data: [] });
  }

  const id_room = await prisma.Tipe_Kamar.findUnique({
    where: {
      id: parseInt(id_tipe_kamar),
    },
  });
  if (!id_room) {
    return res.status(406).json({ sucess: false, message: "room id not found", data: { id_tipe: id_tipe_kamar } });
  }

  const updateRoom = await prisma.kamar.update({
    where: {
      id: parseInt(id),
    },
    data: payload,
  });

  if (!updateRoom) {
    return res.status(400).json({ success: false, message: "Failed to update data", data: [] });
  }
  return res.status(200).json({ success: true, message: "Success update data", data: payload });
}
async function deleteRoom(req, res) {
  const { id } = req.params;
  const findRoom = await prisma.kamar.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!findRoom) {
    return res.status(404).json({ success: false, message: "Data not found", data: [] });
  }
  const deleteRoom = await prisma.kamar.delete({
    where: {
      id: parseInt(id),
    },
  });
  if (!deleteRoom) {
    return res.status(400).json({ success: false, message: "Failed to update data", data: [] });
  }
  return res.status(200).json({ success: true, message: "Success update data", data: findRoom });
}

module.exports = {
  getRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
};
