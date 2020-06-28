const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

module.exports = {
    index(request, response, next) {
        User.find()
            .exec()
            .then(result => {
                response.json(result);
            })
            .catch(err => {
                response.status(500).json(err);
            })
    },

    async signup(request, response, next) {
        const userExists = await User.find({ email: request.body.email });

        if (userExists.length >= 1) {
            return response.json({ message: 'Email already exists' });
        } else {
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
        }
    },

    login(request, response, next) {
        User.find({ email: request.body.email })
            .exec()
            .then(user => {
                if (user.length < 1) {
                    return response.status(401).json({ message: 'Not Authorized' })
                }
                bcrypt.compare(request.body.password, user[0].password, (err, res) => {
                    if (err) {
                        return res.status(401).json({
                            message: 'Auth failed'
                        });
                    }
                    if (res) {
                        const token = jwt.sign(
                            {
                                email: user[0].email,
                                userId: user[0]._id
                            },
                            process.env.JWT_KEY,
                            {
                                expiresIn: "1h",
                            }
                        );
                        return response.json({
                            message: 'Auth successful',
                            token: token
                        });
                    }
                    response.status(500).json({ message: 'Auth failed' });
                })
            })
            .catch(err => {
                response.status(500).json({ err });
            })
    },

    delete(request, response, next) {
        User.findByIdAndDelete(request.params.userId)
            .then(result => {
                if (result) {
                    response.send();
                } else {
                    response.status(404).json({ message: 'User not found' });
                }

            })
            .catch(err => {
                response.status(500).json(err);
            })
    }
}