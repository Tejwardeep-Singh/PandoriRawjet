const express = require("express");
const multer = require('multer');
const path = require('path');
const studentRouter=express.Router();
const jwt = require("jsonwebtoken");
const studentModel= require("../models/studentModel");
const {leaveRequestStudent} = require("../models/leaveRequest")


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

studentRouter.post('/editDetails', upload.single('image'), function(req, res) {
    const { name, fatherName,motherName,city,state, dob, age, mobile, email } = req.body;
    const image = req.file ? req.file.path : null;  // Image path if uploaded, otherwise null
    studentModel.findOneAndUpdate(
                {name},
                {
                    name,
                    fatherName,
                    motherName,
                    city,
                    state,
                    dob,
                    mobile,
                    email,
                    image
                },
                { new: true, upsert: true }
            )
    .then(updatedUser => {
        res.redirect('/student')
    })
    .catch(err => {
        res.redirect('/student');
        res.send('error occured');
    });
});

studentRouter.get("/", async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        console.log("No token found in cookies");
        return res.redirect("/studentLogin");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        const login_id = decoded.id; // or decoded.login_id if that’s your final structure
        const student = await studentModel.findOne({ id: login_id });

        if (!student) {
            console.log("Student not found in DB");
            return res.status(404).send("student not found");
        }

        const studentLeaveDetails = await leaveRequestStudent.find({ id: login_id });

        return res.render("student", {
            user: student,
            user1:{},
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