const express = require("express");
const { getDetails, getDetailsById, newDetails, updateDetails, deleteDetails } = require("../controllers/detailController");
const router = express.Router();

router.get("/", getDetails);
router.get("/:id", getDetailsById);
router.post("/", newDetails);
router.put("/:id", updateDetails);
router.delete("/:id", deleteDetails);

module.exports = router;
