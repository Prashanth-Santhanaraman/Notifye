const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT || 4000;
const notesRoutes = require("./routes/notes");

//middleware
app.use(express.json())

//routes
app.use("/api/notes", notesRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/notes").then(() => {
  app.listen(port, (req, res) => {
    console.log("Connected to the MongoDB and Listening on port", port);
  });
});
