const express = require('express');
const app = express();
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const port = 3000;
const apiRoutes = require('./routes/api');
const accessLogStream = fs.createWriteStream(path.join('logs', 'access.log'), { flags: 'a' })

app.use(morgan('combined', {stream: accessLogStream}));

// app.get('/', (req, res, next) => {
//     res.status(200).json({
//         message: "Hello world"
//     });
// });
app.use('/api', apiRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});