//importing dependencies
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

// Function to serve all static files
app.use("/uploads/", express.static("uploads"));

//calling the dependencies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

//connect to mongodb
mongoose.connect("mongodb://127.0.0.1:27017");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "failed to connect to mongodb"));
db.once("open", () => {
  console.log("Successfully connected to mongodb");
});

const port = 5000;
const server = app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
