const express = require('express');
const app = express();

const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const apiMiddleware = require('./middlewares/api');
const accessLogStream = fs.createWriteStream(path.join('logs', 'access.log'), { flags: 'a' })

app.disable('etag');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan(':date| :method :url :status :response-time[1] ms', {stream: accessLogStream}));

// app.get('/', (req, res, next) => {
//     res.status(200).json({
//         message: "Hello world"
//     });
// });

app.use(apiMiddleware.cors);
// app.use('/api', apiRoutes);
app.use('/api', userRoutes);
app.use('/api', postRoutes);

module.exports = app;