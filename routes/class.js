const express = require("express");
const sectionRouter = express.Router();
const classSection = require("../models/class");
const teacherDetails = require("../models/classIncharge");

sectionRouter.post("/",function(req,res){
    const {id,name,section}=req.body;
    const sections =  new classSection({id:id,name:name,section:section});
    sections.save();
    res.redirect('/head');
})

sectionRouter.post("/assignTeacher", function(req,res){
    const{t_id,kaksha}=req.body;
    const teacher = new teacherDetails({
        id: t_id,
        name:kaksha,
    });
    teacher.save();
    res.redirect('/head');
})

module.exports=sectionRouter;