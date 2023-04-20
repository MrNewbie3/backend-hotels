const express = require('express');
const {
  getDetails, getDetailsById, newDetails, updateDetails, deleteDetails,
} = require('../controllers/detailController');
const authorization = require('../middleware/auth');

const router = express.Router();
const authentication = require('../middleware/roleAuth');

router.get('/', authorization, authentication.receptionistAuth, getDetails);
router.get('/:id', authorization, authentication.receptionistAuth, getDetailsById);
router.post('/', authorization, authentication.receptionistAuth, newDetails);
router.put('/:id', authorization, authentication.receptionistAuth, updateDetails);
router.delete('/:id', authorization, authentication.receptionistAuth, deleteDetails);

module.exports = router;
