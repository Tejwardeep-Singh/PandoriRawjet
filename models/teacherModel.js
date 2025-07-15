const mongoose = require("mongoose");

const teacherDetailsSchema = mongoose.Schema({
    login_id:Number,
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
        type: String 
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    }
});

module.exports = mongoose.model("teacherDetails",teacherDetailsSchema);