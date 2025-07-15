const mongoose = require("mongoose");

const headDetailsSchema = mongoose.Schema({
    name:{
        type:String,
    },
    fatherName:{
        type:String,
    },
    dob:{
        type:String,
    },
    dateOfJoining:{
        type:String,
    },
    mobile:Number,
    age:Number,
    email:{
        type:String,
    },
    image: { 
        type: String }
});

module.exports = mongoose.model("headDetails",headDetailsSchema);