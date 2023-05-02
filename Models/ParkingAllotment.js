const { Timestamp, ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const ParkingAllotment = new Schema({
  user_id: {
    type: ObjectId,
    require: true,
  },
  parking_place_id: {
    type: ObjectId,
    require: true,
  },
  parking_slot_id: {
    type: String,
    require: true,
  },
  parking_start_time: {
    type: String,
    require: true,
  },
  parking_end_time: {
    type: String,
    require: true,
  },
  payment_id: {
    type: ObjectId,
    require: true,
  },
  vehicle_no: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("parking_allotment", ParkingAllotment);
