const express = require("express");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");

const studentRouter = express.Router();
const studentModel = require("../models/studentModel");
const { leaveRequestStudent } = require("../models/leaveRequest");

const {uploadStudent} = require("../config/cloudinaryupload"); // ✅ cloudinary storage

// POST route to update or create student details with cloudinary image upload
studentRouter.post('/editDetails', uploadStudent.single('image'), async function(req, res) {
    const { name, fatherName, motherName, city, state, dob, age, mobile, email } = req.body;
    const image = req.file ? req.file.path : null;

    try {
        const updatedUser = await studentModel.findOneAndUpdate(
            { name },
            {
                name,
                fatherName,
                motherName,
                city,
                state,
                dob,
                age,
                mobile,
                email,
                image
            },
            { new: true, upsert: true }
        );
        res.redirect('/student');
    } catch (err) {
        console.error("Error updating student:", err);
        res.status(500).send("Error occurred while updating student details.");
    }
});

// GET student dashboard
studentRouter.get("/", async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        console.log("No token found in cookies");
        return res.redirect("/studentLogin");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const login_id = decoded.id;

        const student = await studentModel.findOne({ id: login_id });

        if (!student) {
            return res.status(404).send("Student not found");
        }

        const studentLeaveDetails = await leaveRequestStudent.find({ id: login_id });

        res.render("student", {
            user: student,
            user1: {},
            user2: {},
            apply: {},
            studentLeaveDetails,
        });
    } catch (err) {
        console.error("JWT verification failed:", err.message);
        return res.redirect("/studentLogin");
    }
});

module.exports = studentRouter;
