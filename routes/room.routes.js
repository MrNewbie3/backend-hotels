const express = require("express");
const { getRooms, getRoomById, createRoom, updateRoom, deleteRoom } = require("../controllers/roomController");
const authorization = require("../middleware/auth");
const router = express.Router();

router.get("/", authorization, getRooms);
router.get("/:id", authorization, getRoomById);
router.post("/", authorization, createRoom);
router.put("/:id", authorization, updateRoom);
router.delete("/:id", authorization, deleteRoom);

module.exports = router;
