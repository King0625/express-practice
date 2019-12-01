const express = require('express');
const router = express.Router();

router.get('/users', (req, res, next) => {
    res.status(200).json({
        request: {
            method: "GET",
            url: "http://localhost:3000/api/users"
        }
    });
});

router.post('/register', (req, res, next) => {
    res.status(200).json({
        request: {
            method: "POST",
            url: "http://localhost:3000/api/register"
        }
    });
})

router.post('/login', (req, res, next) => {
    res.status(200).json({
        request: {
            method: "POST",
            url: "http://localhost:3000/api/login"
        }
    });
})

module.exports = router;