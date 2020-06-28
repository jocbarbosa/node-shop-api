const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const orderController = require('../controllers/orders');

router.get('/', auth, orderController.index);
router.get('/:orderId', auth, orderController.show);
router.post('/', auth, orderController.store);
router.delete('/:orderId', auth, orderController.delete);

module.exports = router;