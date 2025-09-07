require("dotenv").config();
const express = require("express");
const app =express();
const path=require("path");
const expressSession = require("express-session");
const flash = require("flash");
const cookieParser=require("cookie-parser");
const mongoose = require("mongoose");
const connection=require("./config/mongooseConnection")

app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:process.env.EXPRESS_SESSION_SECRET,
}));    
app.use(flash());
app.use(cookieParser());
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
  });
  

//routes
const homeRouter=require("./routes/home")
const studentLoginRouter=require("./routes/studentLogin")
const teacherLoginRouter=require("./routes/teacherLogin")
const headLoginRouter=require("./routes/headLogin")
const imagesRouter=require("./routes/images")
const studentRouter=require("./routes/student")
const teacherRouter=require("./routes/teacher")
const headRouter=require("./routes/head")
const leaveRouter=require("./routes/leave")
const headTeacherRouter=require("./routes/headTeacher")
const teacherStudentRouter=require("./routes/teacherStudent")
const authRouter=require("./controllers/authController");
const teacherControllerRouter= require("./controllers/teacherController");
const studentControllerRouter= require("./controllers/studentController");
const approveRouter = require("./routes/approve");
const studentRegisterRouter = require("./routes/studentRegister");
const datesheetRouter = require("./routes/datesheet");
const subjectRouter = require("./routes/subject");
const classRouter = require("./routes/class");
const changePasswordRouter = require("./routes/changePassword");
const uploadMarksRouter=require("./routes/uploadMarks");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");

app.use("/",homeRouter);
app.use("/studentLogin",studentLoginRouter);
app.use("/teacherLogin",teacherLoginRouter);
app.use("/headLogin",headLoginRouter);
app.use("/images",imagesRouter);
app.use("/student",studentRouter);
app.use("/teacher",teacherRouter);
app.use("/headTeacher",headTeacherRouter);
app.use("/teacherStudent",teacherStudentRouter);
app.use("/head",headRouter);
app.use("/leave",leaveRouter);
app.use("/approve",approveRouter);
app.use("/datesheet",datesheetRouter);
app.use("/studentRegister",studentRegisterRouter);
app.use("/subject",subjectRouter);
app.use("/subject/addSubject",subjectRouter);
app.use("/class",classRouter);
app.use("/changePassword",changePasswordRouter);
app.use("/uploadMarks",uploadMarksRouter);


app.use("/",teacherStudentRouter);
app.use("/",headRouter);
app.use("/",authRouter);
app.use("/",teacherControllerRouter);
app.use("/",studentControllerRouter);

app.use('/uploads', express.static('uploads'));


app.listen(3000);