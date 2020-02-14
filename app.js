const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const productsRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders')

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Routes which handle the requests
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