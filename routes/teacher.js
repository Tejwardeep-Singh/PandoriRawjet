require('dotenv').config(); //  Load environment variables at the top

const express = require("express");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const teacherRouter = express.Router();
const teacherDetails = require("../models/teacherModel");
const {leaveRequestStudent,leaveRequestTeacher} = require("../models/leaveRequest")

// Multer storage config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Make sure this folder exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});
const upload = multer({ storage: storage });

// POST / — Update or create teacher details
teacherRouter.post("/", upload.single("image"), async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect("/teacherLogin");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const login_id = decoded.login_id;

        const { name, fatherName, dob, dateOfJoining, mobile, email } = req.body;
        const image = req.file ? req.file.path : null;

        const updatedUser = await teacherDetails.findOneAndUpdate(
            { login_id: login_id },
            {
                name,
                fatherName,
                dob,
                dateOfJoining,
                mobile,
                email,
                ...(image && { image }), // Only update image if provided
            },
            { new: true} 
        );

        res.redirect('/teacher');
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
        const teacherLeaveDetails = await leaveRequestTeacher.find({id:login_id})

        if (!teacher) {
            return res.status(404).send("Teacher not found");
        }

        res.render("teacher", {
            user: teacher,
            user1:{},
            user2:{},
            apply:{},
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
