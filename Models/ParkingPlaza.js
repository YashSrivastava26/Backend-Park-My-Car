const mongoose = require("mongoose");
const { Schema } = mongoose;

const ParkingPlazaSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      require: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  latitude: {
    type: Number,
    require: true,
  },
  longitude: {
    type: Number,
    require: true,
  },
  parking_rate: {
    type: Number,
    require: true,
  },
  parking_slots: {
    type: Object,
  },
  booked_parkings: {
    type: [Object],
  },
});

ParkingPlazaSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("parking_plaza", ParkingPlazaSchema);
