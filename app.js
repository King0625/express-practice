const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const apiRoutes = require('./routes/api');
const apiMiddleware = require('./middlewares/api');
const accessLogStream = fs.createWriteStream(path.join('logs', 'access.log'), { flags: 'a' })

app.disable('etag');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan(':date| :method :url :status :response-time[1] ms', {stream: accessLogStream}));

// app.get('/', (req, res, next) => {
//     res.status(200).json({
//         message: "Hello world"
//     });
// });

app.use(apiMiddleware.cors);
app.use('/api', apiRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});