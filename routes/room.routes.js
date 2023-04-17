const express = require("express");
const { getRooms, getRoomById, createRoom, updateRoom, deleteRoom } = require("../controllers/roomController");
const authorization = require("../middleware/auth");
const router = express.Router();
const adminAuth = require("../middleware/roleAuth");
router.get("/", authorization, adminAuth.adminAuth, getRooms);
router.get("/:id", authorization, adminAuth.adminAuth, getRoomById);
router.post("/", authorization, adminAuth.adminAuth, createRoom);
router.put("/:id", authorization, adminAuth.adminAuth, updateRoom);
router.delete("/:id", authorization, adminAuth.adminAuth, deleteRoom);

module.exports = router;
