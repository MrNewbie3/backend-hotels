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
  const files = req.files;
  const { nama_tipe_kamar, harga, deskripsi } = req.body;
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
    data: {
      nama_tipe_kamar,
      harga,
      deskripsi,
      foto: files[0].destination + files[0].filename,
    },
  });
  if (!createType) {
    return res.status(400).json({ sucess: false, message: "Cannot create type", data: nama_tipe_kamar });
  }
  return res.status(200).json({ sucess: true, message: "Success create new type", data: nama_tipe_kamar });
}

async function updateType(req, res) {
  const { id } = req.params;
  const file = req.files;
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
  if (harga && typeof harga !== "number") {
    return res.status(400).json({ success: false, message: "Price must be an integer" });
  }
  const updateType = await prisma.Tipe_Kamar.update({
    where: {
      id: parseInt(id),
    },
    data: {
      nama_tipe_kamar: payload.nama_tipe_kamar ? payload.nama_tipe_kamar : getType.nama_tipe_kamar,
      foto: file ? file[0].destination + file[0].filename : getType.foto,
      deskripsi: payload.deskripsi ? payload.deskripsi : getType.deskripsi,
      harga: payload.harga ? payload.harga : getType.harga,
    },
  });

  if (!updateType) {
    return res.status(400).json({ success: false, message: "Failed to update data", data: [] });
  }
  console.log(req.user  );
  return res.status(200).json({ success: true, message: "Success update data", data: getType });
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
