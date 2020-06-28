const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const auth = require('../middleware/auth');

router.get('/', userController.index);

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.delete('/:userId', auth, userController.delete);

module.exports = router;