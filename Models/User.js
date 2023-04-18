const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    parking_history:{
        type: Array,
        default: []
    },
})

module.exports = mongoose.model('users', UserSchema);