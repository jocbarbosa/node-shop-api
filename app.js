const express = require('express');
const app = express();
const morgan = require('morgan');

const productsRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders')

app.use(morgan('dev'));

app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);


app.use((request, response, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, request, response, next) => {
    response.status(error.status || 500);
    response.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;