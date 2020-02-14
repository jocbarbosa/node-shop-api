const express = require('express');
const router = express.Router();

router.get('/', (request, response, next) => {
    response.status(200).json({
        message: "Orders"
    });
});

router.post('/', (request, response, next) => {
    const order = {
        productId: request.body.productId,
        quantity: request.body.quantity
    };
    response.status(200).json({
        message: "An order was created",
        order: order
    });
});

router.get('/:orderId', (request, response, next) => {
    response.status(200).json({
        message: "Order details",
        orderId: request.params.orderId
    });
});

router.delete('/:orderId', (request, response, next) => {
    response.status(200).json({
        message: "Order deleted",
        orderId: request.params.orderId
    });
});

module.exports = router;