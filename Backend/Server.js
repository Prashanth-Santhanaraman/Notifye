const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT || 4000;
const cors = require("cors");
const notesRoutes = require("./routes/notes");
const authRoutes = require("./routes/auth");
const accountRoutes = require("./routes/account");
const auth = require("./middleware/auth");

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", auth, notesRoutes);
app.use("/api/account", auth, accountRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/notes").then(() => {
  app.listen(port, (req, res) => {
    console.log("Connected to the MongoDB and Listening on port", port);
  });
});
