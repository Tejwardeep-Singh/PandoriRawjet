require('dotenv').config(); // Load environment variables at the top

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const studentRegisterRouter = express.Router();
const studentModel = require("../models/studentModel");
const { uploadStudent } = require("../config/cloudinaryupload"); // Cloudinary upload config
const saltRounds = 10;
const ClassModel = require("../models/class"); // <-- Add this line


studentRegisterRouter.post("/", uploadStudent.single('image'), async function (req, res) {
    try {
        const {
            id,
            name,
            classId,
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
            class: classDoc._id,
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

studentRegisterRouter.get("/", function (req, res) {
    res.render("studentRegister", {
        user1: {},
    });
});

module.exports = studentRegisterRouter;
