const express = require('express');
const router = express.Router();
const Product = require('../model/product');
const mongoose = require('mongoose');

router.get('/', (request, response) => {
    const products = Product.find()
        .exec()
        .then(docs => {
            response.json(docs);
        })
        .catch(error => {
            response.status(500).json({ error });
        })
});

router.get('/:productId', (request, response, next) => {
    const id = request.params.productId;
    Product.findById(id).exec()
        .then(doc => {
            if (doc) {
                return response.json(doc);
            }

            response.status(404).json({ message: 'No product found with this Id' })
        }

        )
        .catch(error => {
            console.log(error);
            response.status(500).json({ error })
        })
});

router.post('/', (request, response, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: request.body.name,
        price: request.body.price
    });

    product.save()
        .then(result => {
            response.status(201).json({
                message: "An order was created",
                createProduct: product
            });
        })
        .catch(error => {
            console.log(error);
            response.status(500).json({ error });
        }
        );
});

router.put('/:productId', (request, response, next) => {
    const product = Product.findByIdAndUpdate({ _id: request.params.productId }, request.body, { new: true }, (err, result) => {
        if (err) {
            response.json(err);
        } else {
            response.json(result);
        }
    });
});

router.delete('/:productId', (request, response, next) => {
    const product = Product.findByIdAndDelete(request.params.productId)
        .exec()
        .then(result => {
            if (result) {
                response.send();
            } else {
                response.status(404).json({ message: 'Product Id not found' });
            }
        })
        .catch(error => {
            response.status(500).json({ error });
        })
});

module.exports = router;