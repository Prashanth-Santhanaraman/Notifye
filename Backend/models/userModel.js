const mongoose = require("mongoose")

// const noteSchema = new mongoose.Schema({
//     _id: mongoose.Types.ObjectId(),
//     title:{
//         type: String,
//         required:true
//     },
//     description:{
//         type: String,
//         required: true
//     }
// },{timestamps:true})

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
        type:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'note',
        }],
        default: []
    }
})

module.exports = mongoose.model("user",userSchema)