const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getDetails(req, res) {
  try {
    const getData = await prisma.Detail_Pemesanan.findMany();
    if (!getData) {
      return res.status(500).json({ success: true, message: 'Failed to proceed request', data: [] });
    }
    return res.status(200).json({ success: true, message: 'Success get data', data: getData });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
}
async function getDetailsById(req, res) {
  const { id } = req.params; // assumes that the ID is passed as a URL parameter
  const getData = await prisma.Detail_Pemesanan.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!getData) {
    return res.status(404).json({ success: false, message: 'Data not found', data: [] });
  }
  return res.status(200).json({ success: true, message: 'Success get data', data: getData });
}
async function newDetails(req, res) {
  const {
    id_pemesanan, id_kamar, tgl_akses, harga,
  } = req.body;
  const payload = req.body; // assumes that the fields are passed in the request body
  const newData = await prisma.Detail_Pemesanan.create({
    data: {
      id_pemesanan,
      id_kamar,
      tgl_akses: new Date(tgl_akses),
      harga: parseInt(harga),
    },
  });
  if (!newData) {
    return res.status(500).json({ success: false, message: 'cannot procceed request', data: payload });
  }
  return res.status(201).json({ success: true, message: 'Success create data', data: newData });
}
async function updateDetails(req, res) {
  const { id } = req.params;
  const payload = req.body; // assumes that the fields are passed in the request body
  const getData = await prisma.Detail_Pemesanan.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!getData) {
    return res.status(404).json({ success: false, message: 'Data not found', data: [] });
  }
  const updatedData = await prisma.Detail_Pemesanan.update({
    where: {
      id: parseInt(id),
    },
    data: {
      id_pemesanan: payload.id_pemesanan || getData.id_pemesanan,
      id_kamar: payload.id_kamar || getData.id_kamar,
      tgl_akses: payload.tgl_akses ? new Date(payload.tgl_akses) : getData.tgl_akses,
      harga: parseInt(payload.harga) || getData.harga,
    },
  });
  if (!updatedData) {
    return res.status(500).json({ success: false, message: 'cannot procceed request', data: payload });
  }
  return res.status(200).json({ success: true, message: 'Success update data', data: updatedData });
}

async function deleteDetails(req, res) {
  const { id } = req.params;
  const getData = await prisma.Detail_Pemesanan.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!getData) {
    return res.status(404).json({ success: false, message: 'Data not found', data: [] });
  }
  const deletedData = await prisma.Detail_Pemesanan.delete({
    where: {
      id: parseInt(id),
    },
  });

  return res.status(200).json({ success: true, message: 'Success delete data', data: deletedData });
}

module.exports = {
  getDetails,
  getDetailsById,
  newDetails,
  updateDetails,
  deleteDetails,
};
