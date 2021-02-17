const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    email: {
        required: true,
        type: String,
        max: 255
    },
    password: {
        required: true,
        type: String,
        min: 3
    }
});

module.exports = mongoose.model('Users', UserSchema);