const express = require('express');
const router = express.Router();

router.get('/', (request, response, next) => {
    response.status(200).json({
        message: 'Handling GET requests to products'
    });
});

router.post('/', (request, response, next) => {
    response.status(200).json({
        message: 'Handling POST requests to products'
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