const { Timestamp, ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const PaymentSchema = new Schema({
  user_id: {
    type: ObjectId,
    require: true,
  },
  transaction_id: {
    type: String,
    require: true,
  },
  transaction_signature: {
    type: String,
    require: true,
  },
  amount: {
    type: String,
    require: true,
  },
  time: {
    type: String,
  },
  status: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("payment", PaymentSchema);
