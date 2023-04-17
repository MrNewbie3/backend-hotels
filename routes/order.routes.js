const express = require("express");
const router = express.Router();
const { getOrder, getOrderById, newOrder, updateOrder, deleteOrder } = require("../controllers/orderController");
const authorization = require("../middleware/auth");

router.get("/", authorization, getOrder);
router.get("/:id", authorization, getOrderById);
router.post("/", authorization, newOrder);
router.put("/:id", authorization, updateOrder);
router.delete("/:id", authorization, deleteOrder);

module.exports = router;
