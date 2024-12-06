const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(400).json({ message: "Token is missing !" });
  }
  try {
    const decodedInfo = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedInfo.id;
    const userProfile = await userModel.findById(userId);
    const passwordCheck = await bcrypt.compare(
      currentPassword,
      userProfile.password
    );
    if (!passwordCheck) {
      return res.status(400).json({ message: "Password is incorrect !" });
    }

    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    userProfile.password = encryptedPassword;
    await userProfile.save();
    return res.status(200).json({ message: "Password Changed Successfully !" });
  } catch (err) {
    res.status(500).json({ message: "Server Error !" });
    console.log(err);
  }
};

const deleteAccount = async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(400).json({ message: "Token is needed !" });
  }
  try {
    const decodedInfo = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedInfo.id;

    const userExist = await userModel.findById(userId);
    if (!userExist) {
      return res.status(200).json({ message: "User not found !" });
    }
    
    await userModel.findByIdAndDelete(userId);
    res.status(200).json({ message: "Account Deleted Successfully !" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { changePassword, deleteAccount };
