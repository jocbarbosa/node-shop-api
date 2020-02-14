const express = require('express');
const app = express();

const productsRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders')

app.use('/products', productsRoutes);
app.use('/products', ordersRoutes);

module.exports = app;