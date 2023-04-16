const express = require("express");
const { getTypes, createType, getTypeById, updateType, deleteType } = require("../controllers/typeController");
const router = express.Router();

router.get("/", getTypes);
router.post("/", createType);
router.get("/:id", getTypeById);
router.put("/:id", updateType);
router.delete("/:id", deleteType);

module.exports = router;
