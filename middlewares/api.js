const Models = require('../models');
const User = Models.User;

exports.cors = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
    
}

exports.tokenAuth = (req, res, next) => {
    const api_token = req.header('Authorization') || '';
    User.findAll({
        where: {
            api_token: api_token
        }
    })
    .then(user => {
        if(user.length <= 0){
            return res.status(403).json({
                message: "Request forbidden"
            })
        }
        req.user = user[0];
        next();
    })
    
    
}