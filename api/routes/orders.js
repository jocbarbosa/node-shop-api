const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');

router.get('/', (request, response) => {
    Order.find()
        .select('product quantity _id')
        .exec()
        .then(docs => {
            const responseData = {
                count: docs.length,
                orders: docs.map(product => {
                    return {
                        id: product._id,
                        quantity: product.quantity,
                        product: product.product,
                        request: {
                            type: 'GET',
                            url: `http://localhost:3000/orders/${product._id}`
                        }
                    }
                })
            }
            response.json(responseData);
        })
        .catch(err => {
            response.json(err);
        })
})

router.post('/', (request, response, next) => {
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: request.body.quantity,
        product: request.body.productId
    });

    order.save()
        .then(result => {
            const responseData = {
                message: 'Order stored',
                createdOrder: {
                    id: result._id,
                    product: result.product,
                    quantity: result.quantity,
                },
                request: {
                    type: 'POST',
                    url: `http://localhost:3000/orders/${result._id}`
                }
            }

            response.json(responseData);
        })
        .catch(err => {
            response.status(500).json(err);
        })
});

module.exports = router;