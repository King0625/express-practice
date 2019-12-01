exports.index = (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        data: user,
        request: {
            method: "GET",
            url: "http://localhost:3000/api/users"
        }
    });
}

exports.register = (req, res, next) => {
    res.status(200).json({
        request: {
            method: "POST",
            url: "http://localhost:3000/api/register"
        }
    });
}

exports.login = (req, res, next) => {
    res.status(200).json({
        request: {
            method: "POST",
            url: "http://localhost:3000/api/login"
        }
    });
}