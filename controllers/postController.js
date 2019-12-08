const Models = require('../models');
const Post = Models.Post;
const User = Models.User;
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
    Post.findAll({
        attributes: ['id', 'userId', 'topic', 'content', 'createdAt', 'updatedAt'],
        include: [{
            model: User,
            attributes: ['id', 'name', 'email']
        }]
    }).then(posts => {
        res.status(200).json({
            data: posts,
            request: {
                method: "GET",
                url: "http://localhost:3000/api/posts"
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

exports.show = (req, res, next) => {
    const id = req.params.id;
    Post.findAll({
        attributes: ['id', 'userId', 'topic', 'content', 'createdAt', 'updatedAt'],
        where: {
            id: id,
        },
        include: [{
            model: User,
            attributes: ['id', 'name', 'email']
        }]
    })
    .then(user => {
        if(user.length === 0){
            res.status(404).json({
                message: "404 not found"
            });
        }

        res.status(200).json({
            data: user,
            request: {
                method: "GET",
                url: "http://localhost:3000/api/posts/" + id
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

exports.userPosts = (req, res, next) => {
    const userId = req.params.userId;
    
    User.findAll({
        where: {
            id: userId
        }
    }).then(user => {
        if(user.length === 0){
            return res.status(404).json({
                message: 'User not found'
            });
        }    
    })
    
    Post.findAll({
        attributes: ['id', 'userId', 'topic', 'content', 'createdAt', 'updatedAt'],
        where: {
            userId: userId,
        }
    }).then(posts => {
        res.status(200).json({
            data: posts,
            request: {
                method: "GET",
                url: "http://localhost:3000/api/users/" + userId + "/posts"
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}
