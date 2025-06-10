const mongoose = require("mongoose");

const studentDetailsSchema = mongoose.Schema({
    id:Number,
    name:{
        type:String,
    },
    class:{
        type:mongoose.Schema.Types.ObjectId,ref:'class'
    },
    fatherName:{
        type:String,
    },
    motherName:{
        type:String,
    },
    city:{
        type:String,
    },
    state:{
        type:String,
    },
    dob:{
        type:Date,
    },
    age:Number,
    mobile:Number,
    email:{
        type:String,
    },
    image: { 
        type: String 
    },
    subjects:{
        type:mongoose.Schema.Types.ObjectId,ref:'subjects'
    },
    marks:{
        type:mongoose.Schema.Types.ObjectId,ref:'marks'
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    }
});

module.exports = mongoose.model("studentDetails",studentDetailsSchema);