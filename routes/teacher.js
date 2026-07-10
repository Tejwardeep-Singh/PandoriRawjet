require('dotenv').config(); // Load environment variables at the top

const express = require("express");
const jwt = require("jsonwebtoken");
const teacherRouter = express.Router();
const teacherDetails = require("../models/teacherModel");
const leaveRequestTeacher= require("../models/leaveRequestTeacher");
const leaveRequestStudent=require("../models/leaveRequestStudent");
const classIncharge=require("../models/classIncharge");
const Marks=require("../models/marks")
const Student = require("../models/studentModel");


const { uploadTeacher } = require("../config/cloudinaryupload");


teacherRouter.post("/", uploadTeacher.single("image"), async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect("/teacherLogin");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const login_id = decoded.login_id;

        const { name, fatherName, dob, dateOfJoining, age,mobile, email } = req.body;
        const image = req.file ? req.file.path : null; // This will be Cloudinary URL

        const updatedUser = await teacherDetails.findOneAndUpdate(
            { login_id: login_id },
            {
                name,
                fatherName,
                dob,
                dateOfJoining,
                age,
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
teacherRouter.get('/logout', (req, res) => {
  res.clearCookie('token'); // This removes the JWT cookie
  res.redirect('/teacherLogin');   // Redirect to login or homepage
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
        const incharge=await classIncharge.findOne({id:login_id}).select('name section');
        const nameValue = incharge?.name;
        const sectionValue = incharge?.section;
        const leave = await leaveRequestStudent.find({status:"pending",kaksha:nameValue,section:sectionValue});
        const teacherLeaveDetails = await leaveRequestTeacher.find({ id: login_id });
       const exams = await Marks.aggregate([
    {
        $match: {
            class: String(nameValue),
            section: String(sectionValue)
        }
    },
    {
        $group: {
            _id: {
                exam_type: "$exam_type",
                date: "$date"
            }
        }
    },
    {
        $sort: {
            "_id.date": -1
        }
    }
]);

        
        let dashboard = {
                students: 0,
                pendingLeaves: 0,
                approvedLeaves: 0,
                totalLeaves: 0,
                classAssigned: "N/A",
                sectionAssigned: "N/A"
            };

            if (incharge) {

                const totalStudents = await Student.countDocuments({
                    name: nameValue,
                    section: sectionValue
                });

                const approvedLeaves = teacherLeaveDetails.filter(
                    leave => leave.status === "approved"
                ).length;

                dashboard = {
                    students: totalStudents,
                    pendingLeaves: leave.length,
                    approvedLeaves,
                    totalLeaves: teacherLeaveDetails.length,
                    classAssigned: nameValue,
                    sectionAssigned: sectionValue
                };
            }
        

        if (!teacher) {
            return res.status(404).send("Teacher not found");
        }

        res.render("teacher", {
            user: teacher,
            user1: {},
            user2: {},
            apply: {},
            leave,
            nameValue,
            sectionValue,
            teacherLeaveDetails,
            dashboard,
            exams,
            message: null,
            error: null,
        });
    } catch (err) {
        console.error("JWT verification failed:", err.message);
        return res.redirect("/teacherLogin");
    }
});
teacherRouter.get("/editStudent/:id", async (req,res)=>{

    const student = await Student.findById(req.params.id);

    res.render("updateStudent",{
        student
    });

});


module.exports = teacherRouter;

