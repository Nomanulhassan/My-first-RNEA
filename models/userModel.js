const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please enter name'],
        trim:true,
    },
    email:{
        type:String,
        required:[true,'please enter email'],
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:[true,'please enter password'],
        min:6,
        max:50,
        trim:true,
    },
    role:{
        type:String,
        default:'User'
    }
},{timestamps:true});

module.exports= mongoose.model('User',userSchema)
