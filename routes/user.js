const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

const apiMiddleware = require('../middlewares/api');

router.get('/users', apiMiddleware.tokenAuth, userController.index);

router.post('/register', userController.validate('createUser'), userController.register);

router.post('/login', userController.validate('login'), userController.login);

router.post('/logout', apiMiddleware.tokenAuth, userController.logout);

module.exports = router;
