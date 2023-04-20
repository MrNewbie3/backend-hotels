const express = require('express');
const multer = require('multer');
const {
  getUser, createUser, updateUser, deleteUser, getUserById, login, signIn,
} = require('../controllers/userController');

const router = express.Router();
const authorization = require('../middleware/auth');

const forms = multer({ dest: '../assets/user/' });
const adminAuth = require('../middleware/roleAuth');

router.get('/', authorization, adminAuth.adminAuth, getUser);
router.post('/', authorization, adminAuth.adminAuth, forms.array('foto'), createUser);
router.get('/:id', authorization, getUserById);
router.put('/:id', authorization, adminAuth.adminAuth, forms.array('foto'), updateUser);
router.delete('/:id', authorization, adminAuth.adminAuth, deleteUser);
// user login and signing in
router.post('/login', login);
router.post('/signin', signIn);

module.exports = router;
