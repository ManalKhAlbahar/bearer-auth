'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const signinRouter = require('./auth/routes/signin');
const signupRouter = require('./auth/routes/signup');
const secretRouter = require('./auth/routes/secretstuff.js');
const bearerAuth = require('./auth/middleware/basicAuth.js');

app.use(express.json());
app.use(cors());
app.use(signinRouter);
app.use(signupRouter);
app.use(secretRouter);

app.get('/', (req, res) => {
    res.send('Home Route')
})

app.use(errorHandler);
app.use('*', notFound);

function start(port) {
    app.listen(port, () => {
        console.log(`welcome we are running on port ${port}`)
    })
}

module.exports = {
    app: app,
    start: start,
}
