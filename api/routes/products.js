const express = require('express');
const router = express.Router();
const Product = require('../model/product');
const mongoose = require('mongoose');

router.get('/', (request, response, next) => {
    response.status(200).json({
        message: 'Handling GET requests to products'
    });
});

router.post('/', (request, response, next) => {
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name: request.body.name,
        price: request.body.price
    });

    product.save()
    .then(result => {
        console.log(result)
    })
    Promise.reject('Oops').catch(err => console.log(err));
    response.status(201).json({
        message: "An order was created",
        createProduct: product
    });
});

router.get('/:productId', (request, response, next) => {
    const id = request.params.productId;

    if (!isNaN(id)) {
        response.status(200).json({
            message: "Product got",
            id: id
        });
    }

});

router.delete(':productId', (request, response, next) => {
    response.status(200).json({

    });
});

module.exports = router;