const express = require("express");
const ParkingPlaza = require("../Models/ParkingPlaza");
const ParkingAllotment = require("../Models/ParkingAllotment");
const validateUser = require("./Authentication/userVerification");
const Payment = require("../Models/Payment");
const User = require("../Models/User");
const router = express.Router();


router.get("/get-bookings",async(req,res)=>{
  try {
    const parking_id = req.query.parking_plaza_id;
    const targetParking = await ParkingPlaza.findById(parking_id)
    res.send({bookings : targetParking.booked_parkings})
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: { message: "Internal server error" } });
  }

})

router.post("/setParkingSlots", async (req, res) => {
  try {
    console.log(req.body);

    const { id, parking_slots } = req.body;

    const updatedParkingPlaza = await ParkingPlaza.findByIdAndUpdate(
      id,
      { parking_slots: parking_slots },
      { new: true }
    );

    return res.send({ msg: "Parking slots set", updatedParkingPlaza });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: { message: "Internal server error" } });
  }
});

router.post("/book-slot", validateUser, async (req, res) => {
  try {
    const userId = req.query.userId;
    const {
      parking_plaza_id,
      parking_start_time,
      parking_end_time,
      vehicle_no,
      amount,
      transaction_id,
    } = req.body;

    const targetParking = await ParkingPlaza.findOne({ _id: parking_plaza_id });
    const parkings = targetParking?.parking_slots;
    const freeParking = parkings.find((p) => p.vacant === true);
    if (!freeParking) {
      return res.status(500).json({ error: { message: "No slot available" } });
    }

    const parking_slot_id = freeParking.parking_id;
    const bookedParking = {
      parking_id: parking_slot_id,
      start_time: parking_start_time,
      end_time: parking_end_time,
    };

    const newPayment = new Payment({
      user_id: userId,
      transaction_id: transaction_id,
      transaction_signature: "",
      amount: amount,
      status: "SUCCESS",
    });

    const newTransaction = await newPayment.save();

    const newParkingAllotment = new ParkingAllotment({
      user_id: userId,
      parking_place_id: parking_plaza_id,
      parking_slot_id: parking_slot_id,
      parking_start_time: parking_start_time,
      parking_end_time: parking_end_time,
      parking_end_time: parking_end_time,
      payment_id: newTransaction?._id,
      vechicle_no: vehicle_no,
    });
    const newParkingAllot = await newParkingAllotment.save();
    await User.updateOne(
      { _id: userId },
      { $push: { parking_history: newParkingAllot?._id } }
    );
    await ParkingPlaza.updateOne(
      { _id: parking_plaza_id },
      { $push: { booked_parkings: bookedParking } }
    );

    res.send({ data: newParkingAllotment, message: "success" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: { message: "Internal server error" } });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, location, parking_rate, latitude, longitude } = req.body;

    parking_plaza = await ParkingPlaza.create({
      name: name,
      location: location,
      latitude: latitude,
      longitude: longitude,
      parking_rate: parking_rate,
    });

    return res.status(200).json(parking_plaza);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: { message: "Internal server error" } });
  }
});

router.get("/get-parking-by-id", async (req, res) => {
  try {
    const id = req.query.id;
    const targetParking = await ParkingPlaza.findById(id);
    res.send({ parking: targetParking });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: { message: "Internal server error" } });
  }
});

router.get("/get-parkings", async (req, res) => {
  try {
    const lat = req.query.lat;
    const lng = req.query.lng;
    console.log(lat, lng);
    const allParkings = await ParkingPlaza.find();
    console.log(allParkings);
    const nearestParkings = await ParkingPlaza.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lat, lng],
          },
          $maxDistance: 500000, //Radius - 50KM
          $minDistance: 0,
        },
      },
    });
    console.log(nearestParkings);
    res.send({
      allParkings: allParkings,
      nearestParkings: nearestParkings,
      message: "success",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: { message: "Internal server error" } });
  }
});

module.exports = router;
