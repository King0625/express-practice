const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const categoryController = require('../controllers/categoryController');
const apiMiddleware = require('../middlewares/api');

router.get('/users', apiMiddleware.tokenAuth, userController.index);
router.post('/register', userController.validate('createUser'), userController.register);
router.post('/login', userController.validate('login'), userController.login);

router.get('/posts', postController.index);
router.get('/posts/:id', postController.show);
router.get('/users/:userId/posts', postController.userPosts);

router.get('/categories', categoryController.index);

// router.use(apiMiddleware.tokenAuth);
router.post('/logout', apiMiddleware.tokenAuth, userController.logout);
router.post('/posts', apiMiddleware.tokenAuth, postController.validate('createPost'), postController.store);
router.put('/posts/:postId', apiMiddleware.tokenAuth, postController.validate('createPost'), postController.update);
router.delete('/posts/:postId', apiMiddleware.tokenAuth, postController.destroy);


module.exports = router;