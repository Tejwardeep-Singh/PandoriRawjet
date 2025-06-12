const express = require("express");
const multer = require('multer');
const path = require('path');
const headRouter = express.Router();
const HeadDetails = require('../models/headDetails');
const headModel = require('../models/headModel');
const {leaveRequestTeacher} = require("../models/leaveRequest")
const subject= require("../models/subject")
const section= require("../models/class")
const saltRounds = 10;

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



// POST route to update or create head details with image upload
headRouter.post('/', upload.single('image'), async function(req, res) {
    const { name, fatherName, dob, dateOfJoining, mobile, email } = req.body;
    const image = req.file ? req.file.path : null;

    try {
        const leave = await leaveRequestTeacher.find({ status: "pending" });

        const updatedUser = await HeadDetails.findOneAndUpdate(
            { name },
            { name, fatherName, dob, dateOfJoining, mobile, email, image },
            { new: true, upsert: true }
        );

        res.render('head', {
            user: updatedUser,
            user1: {},
            user2: {},
            leave,
            message: 'User updated successfully!',
            error: null,
        });
    } catch (err) {
        console.error("Error updating user:", err);
        res.render('head', {
            user: req.body,
            user1: {},
            user2: {},
            leave: [],
            message: null,
            error: 'Error updating user: ' + err.message,
        });
    }
});


// GET route to show head details form
headRouter.get('/', async function(req, res) {
    try {
        const headDetails = await HeadDetails.findOne();
        const leave = await leaveRequestTeacher.find({status:"pending"}); 
        const subjects = await subject.find();
        const sections= await section.find();
        if (!headDetails) {
            return res.status(404).send('Head Details not found');
        }
        res.render('head', {
            user: headDetails,
            user1: {},
            user2: {},
            leave,
            subjects,
            sections,
            error: null,
            message: null
        });
    } catch (err) {
        res.status(500).send('Error fetching headDetails: ' + err.message);
    }
});


module.exports = headRouter;
