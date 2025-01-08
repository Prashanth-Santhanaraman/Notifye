const users = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  if(!name || !email || !password){
    return res.status(400).json({message:"name or email or password is missing"})
  }
  try {
    const exist = await users.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "email already exists !" });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const lowerEmail = email.toLowerCase()
    const newuser = await users.create({ name, email:lowerEmail, password:hashedpassword });
    if (newuser) {
      return res.status(200).json(newuser);
    }
    // else{
    //     return res.status(400).json({message:"Error in creating the new user !"})
    // }
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error in creating the new user !" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email or password is missing !" });
  }

  try {
    const smallCaseEmail = email.toLowerCase()
    const userDetail = await users.findOne({ email:smallCaseEmail });

    if (!userDetail) {
      // User not found (possibly deleted)
      return res.status(400).json({ message: "Account not found" });
    }
    if(userDetail && await bcrypt.compare(password,userDetail.password)){
        const token = jwt.sign({id:userDetail._id},process.env.JWT_SECRET)
        res.setHeader("Authorization", `Bearer ${token}`);
        res.status(200).json({userDetail,token})
    }else{
        return res.status(401).json({message:"Invalid Credential"})
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({message:"Error Logging in"})
  }
};

module.exports = {signup,login}
