const express = require('express');

const router = express.Router();
const apiHandler = require('../controllers/orderController');
const authorization = require('../middleware/auth');
const authentication = require('../middleware/roleAuth');

router.get('/find', apiHandler.findOrder);
router.get('/', authorization, authentication.receptionistAuth, apiHandler.getOrder);
router.get('/:id', authorization, authentication.receptionistAuth, apiHandler.getOrderById);
router.post('/', authorization, authentication.receptionistAuth, apiHandler.newOrder);
router.put('/:id', authorization, authentication.receptionistAuth, apiHandler.updateOrder);
router.delete('/:id', authorization, authentication.receptionistAuth, apiHandler.deleteOrder);

module.exports = router;
