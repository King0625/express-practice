const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const apiMiddleware = require('../middlewares/api');

router.get('/users', apiMiddleware.tokenAuth, userController.index);
router.post('/register', userController.validate('createUser'), userController.register);
router.post('/login', userController.validate('login'), userController.login);

router.get('/posts', postController.index);

router.use(apiMiddleware.tokenAuth);
router.post('/logout', apiMiddleware.tokenAuth, userController.logout);
router.post('/posts', postController.validate('createPost'), postController.store);


module.exports = router;