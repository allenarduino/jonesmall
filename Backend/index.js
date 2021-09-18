//importing dependencies
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

//importing routers
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const adminRoute = require("./routes/adminRoute");
const categoryRoute = require("./routes/categoryRoute");

// Function to serve all static files
app.use("/uploads/", express.static("uploads"));

//calling the dependencies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);
// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

//calling the routers
app.use(userRoute);
app.use(productRoute);
app.use(adminRoute);
app.use(categoryRoute);

//connect to mongodb
mongoose.connect("mongodb://127.0.0.1:27017");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "failed to connect to mongodb"));
db.once("open", () => {
  console.log("Successfully connected to mongodb");
});

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
