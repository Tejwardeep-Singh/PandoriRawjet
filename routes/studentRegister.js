require('dotenv').config(); //  Load environment variables at the top

const express = require("express");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const studentRegisterRouter=express.Router();
const studentModel = require("../models/studentModel");

// Set up multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory to store images (make sure the directory exists)
    },
    filename: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
        }
});

const upload = multer({ storage: storage });

studentRegisterRouter.post("/", upload.single('image'), async function (req, res) {
    try {
        const {
            id,
            name,
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

        if (!id) {
            return res.status(400).send("Student ID is required.");
        }

        const image = req.file ? req.file.path : null;
        const hashedPassword = await bcrypt.hash(id, saltRounds); // Hashing student ID (usually not ideal)

        const dobFormatted = new Date(dob).toISOString().split('T')[0];

        const student = new studentModel({
            id,
            name,
            class:section,
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

        await student.save(); // Await save

        res.redirect("/teacher"); // Use res.redirect instead of just redirect
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred during registration.");
    }
});


studentRegisterRouter.get("/",function(req,res){
    res.render("studentRegister",{
        user1:{},
    });
})
module.exports =studentRegisterRouter;