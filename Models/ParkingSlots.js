const { Int32 } = require('mongodb');
const mongoose = require('mongoose');
const {Schema} = mongoose;

const ParkingSlotsSchema = new Schema({
    parking_place_id:{
        type: String,
        require: true
    },
    slot_id:{
        type: String,
        require: true
    },
    slot_vacant:{
        type: Boolean,
        require: true
    }
})

module.exports = mongoose.model('parking_slots', ParkingSlotsSchema);