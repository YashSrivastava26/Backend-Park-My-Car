const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const {Schema} = mongoose;

const ParkingAllotment = new Schema({
    user_id:{
        type: String,
        require: true
    },
    parking_place_id:{
        type: String,
        require: true
    },
    parking_slot_id:{
        type: String,
        require: true
    },
    parking_start_time:{
        type: Timestamp,
        require: true
    },
    parking_end_time:{
        type: Timestamp
    },
    payment_id:{
        type: Number,
        require: true
    },
    vehicle_no:{
        type: String,
        require: true
    }

})

module.exports = mongoose.model('parking_allotment', ParkingAllotment);