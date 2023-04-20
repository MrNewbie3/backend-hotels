const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getOrder(req, res) {
  const getData = await prisma.pemesanan.findMany();
  if (!getData) {
    return res.status(500).json({ success: true, message: 'Failed to proceed request', data: [] });
  }
  return res.status(200).json({ success: true, message: 'Success get data', data: getData });
}
async function getOrderById(req, res) {
  const { id } = req.params; // assumes that the ID is passed as a URL parameter
  const getData = await prisma.pemesanan.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!getData) {
    return res.status(404).json({ success: false, message: 'Data not found', data: [] });
  }
  return res.status(200).json({ success: true, message: 'Success get data', data: getData });
}
async function newOrder(req, res) {
  const {
    nomor_pemesanan, nama_pemesan, email_pemesan, tgl_pemesanan, tgl_check_in, tgl_check_out, nama_tamu, jumlah_kamar, id_tipe_kamar, status_kamar, id_user,
  } = req.body;

  const existingOrder = await prisma.pemesanan.findUnique({
    where: {
      nomor_pemesanan: parseInt(nomor_pemesanan),
    },
  });

  if (existingOrder) {
    return res.status(400).json({ success: false, message: 'Order already exists', data: existingOrder });
  }

  const newOrder = {
    nomor_pemesanan,
    nama_pemesan,
    email_pemesan,
    tgl_pemesanan: new Date(tgl_pemesanan),
    tgl_check_in: new Date(tgl_check_in),
    tgl_check_out: new Date(tgl_check_out),
    nama_tamu,
    jumlah_kamar,
    id_tipe_kamar,
    status_kamar,
    id_user,
  };

  const createdOrder = await prisma.pemesanan.create({ data: newOrder });

  if (!createdOrder) {
    return res.status(500).json({ success: false, message: 'Failed to create order', data: [newOrder] });
  }

  return res.status(201).json({ success: true, message: 'Order created successfully', data: createdOrder });
}
async function updateOrder(req, res) {
  const { id } = req.params;
  const payload = req.body;

  const order = await prisma.pemesanan.findUnique({
    where: {
      id_pemesanan: parseInt(id),
    },
  });

  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found', data: [] });
  }

  const updatedOrder = await prisma.pemesanan.update({
    where: {
      id_pemesanan: parseInt(id),
    },
    data: {
      nama_pemesan: payload.nama_pemesan || order.nama_pemesan,
      email_pemesan: payload.email_pemesan || order.email_pemesan,
      tgl_pemesanan: payload.tgl_pemesanan ? new Date(payload.tgl_pemesanan) : order.tgl_pemesanan,
      tgl_check_in: payload.tgl_check_in ? new Date(payload.tgl_check_in) : order.tgl_check_in,
      tgl_check_out: payload.tgl_check_out ? new Date(payload.tgl_check_out) : order.tgl_check_out,
      nama_tamu: payload.nama_tamu || order.nama_tamu,
      jumlah_kamar: parseInt(payload.jumlah_kamar) || order.jumlah_kamar,
      id_tipe_kamar: parseInt(payload.id_tipe_kamar) || order.id_tipe_kamar,
      status_kamar: payload.status_kamar || order.status_kamar,
      id_user: parseInt(payload.id_user) || order.id_user,
    },
  });

  return res.status(200).json({ success: true, message: 'Success update data', data: updatedOrder });
}

async function deleteOrder(req, res) {
  const { id } = req.params;
  const getData = await prisma.pemesanan.findUnique({
    where: {
      id_pemesanan: parseInt(id),
    },
  });
  if (!getData) {
    return res.status(404).json({ success: false, message: 'Data not found', data: [] });
  }
  const deletedData = await prisma.pemesanan.delete({
    where: {
      id_pemesanan: parseInt(id),
    },
  });
  if (!deletedData) {
    return res.status(500).json({ success: false, message: 'Failed to delete data', data: getData });
  }

  return res.status(200).json({ success: true, message: 'Success delete data', data: deletedData });
}

async function findOrder(req, res) {
  const { email_pemesan = '', nomor_pemesanan = 0 } = req.query;
  try {
    const orderData = await prisma.pemesanan.findMany({ where: { email_pemesan, nomor_pemesanan: parseInt(nomor_pemesanan) } });
    return res.status(200).json({ success: true, message: 'Success find data', data: orderData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message, data: [] });
  }
}
module.exports = {
  getOrder,
  getOrderById,
  newOrder,
  updateOrder,
  deleteOrder,
  findOrder,
};
