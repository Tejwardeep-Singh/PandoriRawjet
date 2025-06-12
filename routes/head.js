const express = require("express");
const headRouter = express.Router();
const HeadDetails = require('../models/headDetails');
const upload = require("../config/cloudinaryUpload");
const { leaveRequestTeacher } = require("../models/leaveRequest");
const subject = require("../models/subject");
const section = require("../models/class");

// POST route with cloud upload
headRouter.post('/', upload.single('image'), async function (req, res) {
    try {
        const { name, fatherName, dob, dateOfJoining, mobile, email } = req.body;
        const image = req.file ? req.file.path : null; 

        const updateData = { name, fatherName, dob, dateOfJoining, mobile, email };
        if (image) updateData.image = image;

        const updatedUser = await HeadDetails.findOneAndUpdate(
            { name },
            updateData,
            { new: true, upsert: true }
        );

        const leave = await leaveRequestTeacher.find({ status: "pending" });
        const subjects = await subject.find();
        const sections = await section.find();

        res.render('head', {
            user: updatedUser,
            user1: {},
            user2: {},
            leave,
            subjects,
            sections,
            message: 'User updated successfully!',
            error: null
        });

    } catch (err) {
        console.error("Cloud upload error:", err);
        res.status(500).render('head', {
            user: req.body,
            user1: {},
            user2: {},
            leave: [],
            subjects: [],
            sections: [],
            message: null,
            error: 'Error uploading image: ' + err.message
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
