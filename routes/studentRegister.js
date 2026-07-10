require('dotenv').config(); // Load environment variables at the top

const express = require('express');
const multer = require('multer');
const XLSX = require('xlsx');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const studentRegisterRouter = express.Router();
const studentModel = require("../models/studentModel");
const { uploadStudent } = require("../config/cloudinaryupload"); // Cloudinary upload config
const saltRounds = 10;
const ClassModel = require("../models/class"); // <-- Add this line

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

studentRegisterRouter.post("/", uploadStudent.single('image'), async function (req, res) {
    try {
        const {
            id,
            name,
            classId,
            section,
            fatherName,
            motherName,
            city,
            state,
            dob,
            age,
            mobile,
            email
        } = req.body;
        // 🔍 Find the class by its numeric id from the form
        const classDoc = await ClassModel.findOne({ id: parseInt(classId) });

        if (!classDoc) {
            return res.status(400).send("Class not found.");
        }


        if (!id) {
            return res.status(400).send("Student ID is required.");
        }

        const image = req.file ? req.file.path : null; // Cloudinary URL
        const hashedPassword = await bcrypt.hash(id, saltRounds);

        const dobFormatted = new Date(dob).toISOString().split('T')[0];

        const student = new studentModel({
            id,
            name,
            class:classId,
            section,
            fatherName,
            motherName,
            city,
            state,
            dob: dobFormatted,
            age,
            mobile,
            email,
            image,
            password: hashedPassword
        });

        await student.save();

        res.redirect("/teacher"); // Redirect after successful registration
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred during registration.");
    }
});
studentRegisterRouter.post('/uploadExcel', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).send('No file uploaded.');

    // Read Excel from memory buffer
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);
    const studentsToInsert = data.map((student) => ({
      id: student.id,
      name: student.name,
      class: student.class,
      section: student.section,
      fatherName: student.fatherName,
      motherName: student.motherName,
      city: student.city,
      state: student.state,
      dob: new Date(student.dob),
      age: student.age,
      mobile: student.mobile,
      email: student.email,
      password: student.id ? bcrypt.hashSync(student.id.toString(), saltRounds) : null // Hash the ID for password
    }));

    await studentModel.insertMany(studentsToInsert);

    res.redirect("/teacher")
  } catch (err) {
    console.error(err);
    res.status(500).send('Error processing the Excel file.');
  }
});
studentRegisterRouter.get("/", function (req, res) {
    res.render("studentRegister", {
        user1: {},
    });
});


studentRegisterRouter.post(
"/updateStudent/:id",
uploadStudent.single("image"),
async(req,res)=>{

const student=await studentModel.findById(req.params.id);

student.name=req.body.name;
student.fatherName=req.body.fatherName;
student.motherName=req.body.motherName;
student.city=req.body.city;
student.state=req.body.state;
student.mobile=req.body.mobile;
student.email=req.body.email;
student.age=req.body.age;
student.dob=req.body.dob;

if(req.file){

student.image=req.file.path;

}

await student.save();

res.redirect("/teacher");

});

module.exports = studentRegisterRouter;
