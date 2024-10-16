const express = require("express");
const router = express.Router();
const {
  getNotes,
  getNote,
  newNote,
  updateNote,
  deleteNote,
} = require("../controllers/notesController");

router.get("/", getNotes);

router.get("/:id", getNote);

router.post("/", newNote);

router.patch("/:id", updateNote);

router.delete("/:id", deleteNote);

module.exports = router;
