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
    confirmPassword: {
        type: String,
        required: [true, 'Please confir your password']
    }
    
})

const User =mongoose.model('User', userSchema);

module.exports = User;