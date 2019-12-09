const Models = require('../models');
const Category = Models.Category;

exports.index = (req, res, next) => {
    Category.findAll()
    .then(categories => {
        res.status(200).json({
            data: categories,
            request: {
                method: "GET",
                url: "http://localhost:3000/api/categories"
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}