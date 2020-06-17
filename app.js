const express = require('express');

const app = express()

const userRouter = require('./routes/user');
app.use(express.urlencoded({ extended: true }))

// console.log(process.env);
app.use('/user', userRouter);

// const port = process.env.PORT;

module.exports = app
