const express = require("express");
const { getUser, createUser, updateUser, deleteUser, getUserById, login, signIn } = require("../controllers/userController");
const router = express.Router();
const multer = require("multer");
const authorization = require("../middleware/auth");
const forms = multer({ dest: "../assets/user/" });

router.get("/", authorization, getUser);
router.post("/", authorization, forms.array("foto"), createUser);
router.get("/:id", authorization, getUserById);
router.put("/:id", authorization, forms.array("foto"), updateUser);
router.delete("/:id", authorization, deleteUser);
// user login and signing in
router.post("/login", login);
router.post("/signin", signIn);

module.exports = router;
