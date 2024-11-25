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
  try {
    const decodedInfo = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedInfo.id;
    const allNotes = await userModel.findById(userId).populate("notes");
    // console.log(decodedInfo);
    console.log(allNotes);
    res.status(200).json({notes: allNotes.notes});
  } catch (err) {
    console.error(err)
    res.status(400).json({message:"Failed to fetch the notes"})
  }
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
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(400).json({ message: "Token is missing !" });
  }
  const decodedInfo = jwt.verify(token, process.env.JWT_SECRET);
  try {
    const user = await userModel.findById(decodedInfo.id);
    const newNote = await notesModel.create({ title, description });

    user.notes.push(newNote._id);
    await user.save();

    res.status(200).json(newNote);
  } catch (error) {
    console.error(error);
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

  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(400).json({ message: "Token is missing !" });
  }
  try {
    const decodedInfo = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedInfo.id;
    const { id } = req.params;
    const allNotes = await userModel.findById(userId).populate("notes");

    const noteExists = allNotes.notes.some(noteId => noteId._id.toString() === id)
    if (!noteExists){
      return res.status(400).json({message:"Note not found or trying to delete other users notes"})
    }
    
    const userDetails = await userModel.findByIdAndUpdate(
      userId,
      {$pull: {notes: id}},
      {new: true}
    )
    if(!userDetails) {
      console.log('User not found');
    }
    const deleteNote = await notesModel.findByIdAndDelete(id)
    if(!deleteNote){
      console.log("Note not found or already deleted")
      return res.status(400).json({message: "Note not found"})
    }

    console.log("Note deleted !")
    return res.status(200).json(deleteNote)
  }catch(err){
    console.error(err)
    res.status(400).json({message:"Error in deleting the note !"})
  }
};

module.exports = {
  getNote,
  newNote,
  updateNote,
  deleteNote,
  particularUserNotes,
};
