require('dotenv').config(); // Load environment variables at the top

const express = require("express");
const jwt = require("jsonwebtoken");
const teacherRouter = express.Router();
const teacherDetails = require("../models/teacherModel");
const { leaveRequestStudent, leaveRequestTeacher } = require("../models/leaveRequest");

// Cloudinary upload setup
const { uploadTeacher } = require("../config/cloudinaryupload");

// POST / — Update or create teacher details with image upload
teacherRouter.post("/", uploadTeacher.single("image"), async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect("/teacherLogin");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const login_id = decoded.login_id;

        const { name, fatherName, dob, dateOfJoining, mobile, email } = req.body;
        const image = req.file ? req.file.path : null; // This will be Cloudinary URL

        const updatedUser = await teacherDetails.findOneAndUpdate(
            { login_id: login_id },
            {
                name,
                fatherName,
                dob,
                dateOfJoining,
                mobile,
                email,
                ...(image && { image }) // Only update image if uploaded
            },
            { new: true }
        );

        res.redirect("/teacher");
    } catch (err) {
        console.error("JWT or DB error:", err.message);
        return res.redirect("/teacherLogin");
    }
});

// GET / — Fetch and render teacher details
teacherRouter.get("/", async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect("/teacherLogin");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const login_id = decoded.login_id;

        const teacher = await teacherDetails.findOne({ login_id: login_id });
        const leave = await leaveRequestStudent.find();
        const teacherLeaveDetails = await leaveRequestTeacher.find({ id: login_id });

        if (!teacher) {
            return res.status(404).send("Teacher not found");
        }

        res.render("teacher", {
            user: teacher,
            user1: {},
            user2: {},
            apply: {},
            leave,
            teacherLeaveDetails,
            message: null,
            error: null,
        });
    } catch (err) {
        console.error("JWT verification failed:", err.message);
        return res.redirect("/teacherLogin");
    }
});

module.exports = teacherRouter;

