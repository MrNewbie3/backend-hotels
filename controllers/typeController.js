const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getTypes(req, res) {
  const getData = await prisma.Tipe_Kamar.findMany();
  if (!getData) {
    return res.status(400).json({ success: false, message: "Cannot proceed request", data: [] });
  }
  return res.status(200).json({ success: true, message: "Success get all data", data: getData });
}

async function getTypeById(req, res) {
  const { id } = req.params;
  const getType = await prisma.Tipe_Kamar.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!getType) {
    return res.status(404).json({ success: false, message: "Data not found", data: [] });
  }
  return res.status(200).json({ success: true, message: "Success get single data", data: getType });
}

async function createType(req, res) {
  const { nama_tipe_kamar, harga } = req.body;
  const payload = req.body;
  const checkType = await prisma.Tipe_Kamar.findUnique({
    where: {
      nama_tipe_kamar,
    },
  });
  if (checkType) {
    return res.status(400).json({ sucess: false, message: "Type already exist", data: nama_tipe_kamar });
  }
  if (typeof harga !== "number") {
    return res.status(400).json({ success: false, message: "Price must be an integer" });
  }
  const createType = await prisma.Tipe_Kamar.create({
    data: payload,
  });
  if (!createType) {
    return res.status(400).json({ sucess: false, message: "Cannot create type", data: nama_tipe_kamar });
  }
  return res.status(200).json({ sucess: true, message: "Success create new type", data: nama_tipe_kamar });
}

async function updateType(req, res) {
  const { id } = req.params;
  const { harga } = req.body;
  const payload = req.body;
  const getType = await prisma.Tipe_Kamar.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!getType) {
    return res.status(404).json({ success: false, message: "Data not found", data: [] });
  }
  if (typeof harga !== "number") {
    return res.status(400).json({ success: false, message: "Price must be an integer" });
  }
  const updateType = await prisma.Tipe_Kamar.update({
    where: {
      id: parseInt(id),
    },
    data: payload,
  });

  if (!updateType) {
    return res.status(400).json({ success: false, message: "Failed to update data", data: [] });
  }
  return res.status(200).json({ success: true, message: "Success update data", data: payload });
}

async function deleteType(req, res) {
  const { id } = req.params;
  const getType = await prisma.Tipe_Kamar.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!getType) {
    return res.status(404).json({ success: false, message: "Data not found", data: [] });
  }
  const deleteType = await prisma.Tipe_Kamar.delete({
    where: {
      id: parseInt(id),
    },
  });
  if (!deleteType) {
    return res.status(400).json({ success: false, message: "Failed to delete data", data: [] });
  }
  return res.status(200).json({ success: true, message: "Success delete data", data: getType });
}

module.exports = {
  getTypes,
  getTypeById,
  createType,
  updateType,
  deleteType,
};
