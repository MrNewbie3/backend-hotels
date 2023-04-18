const express = require("express");
const router = express.Router();
const { getOrder, getOrderById, newOrder, updateOrder, deleteOrder } = require("../controllers/orderController");
const authorization = require("../middleware/auth");
const authentication = require("../middleware/roleAuth");

router.get("/", authorization, authentication.receptionistAuth, getOrder);
router.get("/:id", authorization, authentication.receptionistAuth, getOrderById);
router.post("/", authorization, authentication.receptionistAuth, newOrder);
router.put("/:id", authorization, authentication.receptionistAuth, updateOrder);
router.delete("/:id", authorization, authentication.receptionistAuth, deleteOrder);

module.exports = router;
