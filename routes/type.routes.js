const express = require("express");
const { getTypes, createType, getTypeById, updateType, deleteType } = require("../controllers/typeController");
const router = express.Router();
const multer = require("multer");
const adminAuth = require("../middleware/roleAuth");
const authorization = require("../middleware/auth");
const forms = multer({ dest: "../assets/type/" });
router.get("/", authorization, adminAuth.adminAuth, getTypes);
router.post("/", authorization, adminAuth.adminAuth, forms.array("foto"), createType);
router.get("/:id", authorization, adminAuth.adminAuth, getTypeById);
router.put("/:id", authorization, adminAuth.adminAuth, forms.array("foto"), updateType);
router.delete("/:id", authorization, adminAuth.adminAuth, deleteType);

module.exports = router;
