const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const messageController = require('../controllers/messageController');

router.get('/users', userController.index);
router.post('/register', userController.register);
router.post('/login', userController.login);

router.get('/messages', messageController.index);
router.post('/messages', messageController.store);


module.exports = router;