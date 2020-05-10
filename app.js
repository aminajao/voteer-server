const express = require('express');

const app = express()

const IndexRouter = require('./routes/user');


// console.log(process.env);
app.use('/user', IndexRouter);

// const port = process.env.PORT;

module.exports = app
