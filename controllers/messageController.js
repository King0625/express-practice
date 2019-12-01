exports.index = (req, res, next) => {
    res.status(200).json({
        request: {
            method: "GET",
            url: "http://localhost:3000/api/messages"
        }
    });
}

exports.store = (req, res, next) => {
    res.status(200).json({
        request: {
            method: "POST",
            url: "http://localhost:3000/api/messages"
        }
    });
}