const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter a valid student email!']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password']
    },
    department: {
        type: String,
        required: [true, 'Please enter ur department']
    }
    
})

const User =mongoose.model('User', userSchema);

module.exports = User;