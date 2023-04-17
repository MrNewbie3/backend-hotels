const express = require("express");
const { getDetails, getDetailsById, newDetails, updateDetails, deleteDetails } = require("../controllers/detailController");
const authorization = require("../middleware/auth");
const router = express.Router();

router.get("/", authorization, getDetails);
router.get("/:id", authorization, getDetailsById);
router.post("/", authorization, newDetails);
router.put("/:id", authorization, updateDetails);
router.delete("/:id", authorization, deleteDetails);

module.exports = router;
