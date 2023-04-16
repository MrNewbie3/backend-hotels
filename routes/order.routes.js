const express = require("express");
const router = express.Router();
const { getOrder, getOrderById, newOrder, updateOrder, deleteOrder } = require("../controllers/orderController");

router.get("/", getOrder);
router.get("/:id", getOrderById);
router.post("/", newOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;
