const express = require('express');

const router = express.Router();

const postController = require('../controllers/postController');

const apiMiddleware = require('../middlewares/api');

router.get('/posts', postController.index);

router.get('/posts/:id', postController.show);

router.get('/users/:userId/posts', postController.userPosts);

router.post('/posts', apiMiddleware.tokenAuth, postController.validate('createPost'), postController.store);

router.put('/posts/:postId', apiMiddleware.tokenAuth, postController.validate('createPost'), postController.update);

router.delete('/posts/:postId', apiMiddleware.tokenAuth, postController.destroy);

module.exports = router;
