const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const messageController = require('../controllers/messageController');
const apiMiddleware = require('../middlewares/api');

router.get('/users', apiMiddleware.tokenAuth, userController.index);
router.post('/register',userController.validate('createUser'), userController.register);
router.post('/login',userController.validate('login'), userController.login);

router.get('/messages', messageController.index);
router.post('/messages', messageController.store);


module.exports = router;