const Models = require('../models');
const User = Models.User;
const bcrypt = require('bcrypt');
const randomString = require('crypto-random-string');
const { body, validationResult } = require('express-validator/check');

exports.validate = (method) => {
    switch (method) {
        case 'createUser': {
            return [ 
                body('email').exists().withMessage('The email field is required!')
                .isEmail().withMessage('Invalid email'),

                body('name').exists().withMessage('The name field is required!')
                .isLength({min: 2}).withMessage('The name field should contain at least 2 characters'),
                
                body('password').exists().withMessage('The password field is required!')
                .isLength({min: 6}).withMessage('Password length should be at least 6')
            ]  
        }
        case 'login': {
            return [ 
                body('email', 'Email field is empty').exists(),
                body('password', 'Password field is empty').exists(),
            ]  
        }
    }
}


exports.index = (req, res, next) => {
    // const user = req.user;
    // console.log(user);
    User.findAll().then(users => {
        res.status(200).json({
            data: users,
            auth_user: req.user,
            request: {
                method: "GET",
                url: "http://localhost:3000/api/users"
            }
        });
    });
}

exports.register = (req, res, next) => {
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    User.findAll({
        where: {email: req.body.email}
    })
    .then(user => {
        if(user.length >= 1){
            return res.status(409).json({
                message: 'Mail has been used'
            });
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    res.status(500).json({
                        error: err
                    });
                }else{
                    User.create({
                        "email": req.body.email,
                        "name": req.body.name,
                        'password': hash,
                        'api_token': randomString({length: 50}),
                        "admin": true
                    })
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            data: result,
                            request: {
                                method: "POST",
                                url: "http://localhost:3000/api/register"
                            }
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        });
                    });
                }
            });
        }
    });
}
    

exports.login = (req, res, next) => {
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    User.findAll({
        where: {
            email: req.body.email
        }
    })
    .then(user => {
        if(user.length <= 0){
            return res.status(401).json({
                message: "Auth failed"
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if(err){
                return res.status(401).json({
                    message: "Auth failed"
                }); 
            }
            if(result){
                user[0].update({
                    api_token: randomString({length: 50})
                });
                return res.status(200).json({
                    message: "Auth succeeded",
                    api_token: user[0].api_token,
                    request: {
                        method: "POST",
                        url: "http://localhost:3000/api/login"
                    }
                });
            }
            res.status(401).json({
                message: "Auth failed"
            })
        });
    })

}

exports.logout = (req, res, next) => {
    const user = req.user;
    // console.log(user);
    user.update({
        'api_token': null
    })
    .then(user => {
        res.status(200).json({
            message: "Logout successfully",
            user: user
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    })

}