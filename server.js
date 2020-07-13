const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');


dotenv.config({path: './config.env'});
// console.log(process.env)


//for local database
// const DB = 'mongodb://localhost/Evote'

//for remote database
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log('DB connected successfully')).catch(err => console.log(err));


const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

module.exports = app;