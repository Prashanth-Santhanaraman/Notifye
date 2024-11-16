const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required: true
    }
},{timestamps:true})

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required:true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    notes:{
        type:[noteSchema],
        default: []
    }
})

module.exports = mongoose.model("user",userSchema)