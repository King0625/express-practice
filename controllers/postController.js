const Models = require('../models');
const Post = Models.Post;
const { body, validationResult } = require('express-validator/check');

exports.validate = (method) => {
    switch (method) {
        case 'createPost': {
            return [
                body('topic').exists().withMessage('Topic cannot be null')
                .isLength({min: 2}).withMessage('Topic should contain at least 2 characters'),
                
                body('content').exists().withMessage('content cannot be null')
                .isLength({min: 2}).withMessage('Content should contain at least 2 characters')
            ];
        }
    }
}

exports.store = (req, res, next) => {
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const user = req.user;
    // console.log(user.id);
    Post.create({
        userId: user.id,
        topic: req.body.topic,
        content: req.body.content
    })
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: "Post created successfully",
            data: result,
            request: {
                method: "POST",
                url: "http://localhost:3000/api/posts"
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}
exports.index = (req, res, next) => {

}
