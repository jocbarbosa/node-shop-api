const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');

module.exports = {
    index(request, response) {
        Order.find()
            .select('product quantity _id')
            .populate('product', 'name price')
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
    },

    show(request, response, next) {
        const order = Order.findById(request.params.orderId)
            .select('quantity product _id')
            .populate('product', 'name price')
            .exec()
            .then(order => {
                if (order) {
                    response.json(order);
                } else {
                    response.status(404).json({ message: 'Order not found' });
                }

            })
            .catch(error => {
                response.status(500).json({ error });
            })
    },

    store(request, response, next) {
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
    },

    delete(request, response, next) {
        const order = Order.findByIdAndDelete(request.params.orderId)
            .exec()
            .then(result => {
                if (result) {
                    response.send();
                } else {
                    response.status(404).json({ message: 'Product Id not found' });
                }
            })
            .catch()
    }
}

