const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

connectToMongo();

const app = express();
const PORT = 3001;

//middleware
app.use(cors());
app.use(express.json());

//Routes

//authentication
app.use("/api/v1/auth/login", require("./Routes/Authentication/login.js"));
app.use("/api/v1/auth/signup", require("./Routes/Authentication/signup.js"));


//parking plaza api
app.use("/api/v1/parking-plaza", require("./Routes/ParkingPlaza.js"));



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
