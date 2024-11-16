const notesModel = require("../models/notesModel");
const userModel = require("../models/userModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
// to get all notes
// const getNotes = async (req, res) => {
//   try {
//     const allNotes = await notesModel.find({});
//     res.status(200).json(allNotes);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

//To get particular User Notes

const particularUserNotes = async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(400).json({ message: "Token is missing !" });
  }
  const decodedInfo = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedInfo.id;
  const allNotes = await userModel.findById(userId);
  console.log(decodedInfo);
  console.log(allNotes);
  res.status(200).json(decodedInfo);
};

//to get particular note by using ID
const getNote = async (req, res) => {
  const { id } = req.params;
  try {
    const oneNote = await notesModel.findById(id);
    if (!oneNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(oneNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  //   res.json({ message: "Got the one get request" });
};

// to post a note
const newNote = async (req, res) => {
  const { title, description } = req.body;
  try {
    const newNote = await notesModel.create({ title, description });
    res.status(200).json(newNote);
  } catch (error) {
    res.status(400).json({ message: "Can not create new note" });
  }

  //   res.json({ message: "Got the post request" });
};

// to update a note
const updateNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No such note" });
  }

  const note = await notesModel.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!note) {
    res.status(400).json({ message: "No such note to update" });
  }

  res.status(200).json(note);
  // res.json({ message: "Got the Update request" });
};

//to delete a note
const deleteNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No such note" });
  }

  const note = await notesModel.findByIdAndDelete({ _id: id });

  if (!note) {
    res.status(400).json({ message: "No such note to delete" });
  }

  res.status(200).json(note);
  // res.json({ message: "Got the Delete request" });
};

module.exports = {

  getNote,
  newNote,
  updateNote,
  deleteNote,
  particularUserNotes,
};
