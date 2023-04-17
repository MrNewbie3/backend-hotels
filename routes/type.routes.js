const express = require("express");
const { getTypes, createType, getTypeById, updateType, deleteType } = require("../controllers/typeController");
const router = express.Router();
const multer = require("multer");
const authorization = require("../middleware/auth");
const forms = multer({ dest: "../assets/type/" });
router.get("/", authorization, getTypes);
router.post("/", authorization, forms.array("foto"), createType);
router.get("/:id", authorization, getTypeById);
router.put("/:id", authorization, forms.array("foto"), updateType);
router.delete("/:id", authorization, deleteType);

module.exports = router;
