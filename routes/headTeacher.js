const express = require("express");
const multer = require('multer');
const path = require('path');
const headTeacherRouter = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const teacherDetails = require('../models/teacherModel');
const studentDetails = require('../models/studentModel');
const headDetails = require('../models/headDetails');

// Set up multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Make sure this directory exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage: storage });

// ✅ POST route: Create/update teacher, then redirect to /head with teacher ID
headTeacherRouter.post('/', upload.single('image'), async function(req, res) {
    const { login_id, name, fatherName, dob, dateOfJoining, mobile, email } = req.body;
    const image = req.file ? req.file.path : null;
    const dobFormatted = new Date(dob).toISOString().split('T')[0];
    const dojFormatted = new Date(dateOfJoining).toISOString().split('T')[0];

    try {
        const hashedPassword = await bcrypt.hash(login_id, saltRounds);
        await teacherDetails.findOneAndUpdate(
            { login_id },
            {
                login_id,
                name,
                fatherName,
                dob: dobFormatted,
                dateOfJoining: dojFormatted,
                mobile,
                email,
                image,
                password:hashedPassword,
            },
            { new: true, upsert: true }
        );

        // Redirect to /head with login_id as query param
        res.redirect(`/head?id=${login_id}&message=Teacher%20updated%20successfully`);
    } catch (err) {
        console.error("Error updating teacher:", err.message);
        // Redirect with error message (optional)
        res.redirect(`/head?error=${encodeURIComponent(err.message)}`);
    }
});
headTeacherRouter.post('/removeTeacher', async function(req, res) {
    const { id } = req.body;
    try {
        
        await teacherDetails.deleteOne(id);
        // Redirect to /head with login_id as query param
        res.redirect(`/head?id=${login_id}&message=Teacher%20updated%20successfully`);
    } catch (err) {
        console.error("Error updating teacher:", err.message);
        // Redirect with error message (optional)
        res.redirect(`/head?error=${encodeURIComponent(err.message)}`);
    }
});

// GET route to fetch teacher data and head data
headTeacherRouter.get('/', async function(req, res) {
    const { id, message, error } = req.query;

    try {
        const teacher = id ? await teacherDetails.findOne({ login_id: id }) : null;
        const head = await headDetails.findOne();

        // Render 'headTeacher' only if teacher is fetched
        if (teacher) {
            res.render('headTeacher', {
                user2: teacher,     // Teacher details
                user1: {},          // Optional
                user: head || {},   // Head details
                message: message || null,
                error: null
            });
        } else {
            // Teacher not found — optionally render head page with head info
            res.render('head', {
                user1: {}, 
                user2: {}, 
                user: head || {},
                message: null,
                error: "Teacher not found."
            }); 
        }
    } catch (err) {
        res.status(500).send('Error fetching data: ' + err.message);
    }
});
headTeacherRouter.get('/studentDetails', async function(req, res) {
    const { kaksha1,id, message, error } = req.query;

    try {
        const student = id ? await studentDetails.findOne({ id: id }) : null;
        const head = await headDetails.findOne();

        // Render 'headTeacher' only if student is fetched
        if (student) {
            res.render('headStudent', {
                user2: student,     // student details
                user1: {},  
                leave:{},        // Optional
                user: head || {},   // Head details
                message: message || null,
                error: null
            });
        } else {
            // student not found — optionally render head page with head info
            res.render('head', {
                user1: {}, 
                user2: {}, 
                leave:{},
                user: head || {},
                message: null,
                error: "student not found."
            }); 
        }
    } catch (err) {
        res.status(500).send('Error fetching data: ' + err.message);
    }
});

module.exports = headTeacherRouter;
