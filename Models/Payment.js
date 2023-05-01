const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const {Schema} = mongoose;

const PaymentSchema = new Schema({
    user_id:{
        type: String,
        require: true
    },
    transaction_id:{
        type: String,
        require: true,
        unique: true
    },
    transaction_signature:{
        type: String,
        require: true
    },
    amount:{
        type: Number,
        require: true
    },
    time:{
        type: Timestamp,
        default: () => Math.floor(Date.now() / 1000) << 32
    },
    status:{
        type: String,
        require: true
    },

})

module.exports = mongoose.model('payment', PaymentSchema);