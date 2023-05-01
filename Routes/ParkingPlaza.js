const express = require("express");
const ParkingPlaza = require("../Models/ParkingPlaza");
const router = express.Router();

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
  } catch (error) {}
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

module.exports = router;
