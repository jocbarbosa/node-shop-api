const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');

router.post('/signup', async (request, response, next) => {

    bcrypt.hash(request.body.password, 10, (err, hash) => {
        if (err) {
            return response.status(500).json({ err })
        } else {
            const user = new User({
                _id: mongoose.Types.ObjectId(),
                email: request.body.email,
                password: hash
            });

            user.save()
                .then(result => {
                    response.status(201).json({
                        message: 'User created'
                    })
                })
                .catch(err => {
                    response.status(500).json({ err })
                })
        }
    });
});

module.exports = router;