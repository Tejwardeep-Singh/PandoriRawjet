require('dotenv').config(); // Load environment variables at the top
const express = require("express");
const marksRouter = express.Router();
const studentDetails=require("../models/studentModel");
const subjectClass=require("../models/subjectClass");
const Marks=require("../models/marks");
const ExcelJS = require("exceljs");

marksRouter.post('/upload', async (req, res) => {
  const { nameValue, sectionValue, exam_type, total, marks, date } = req.body;
  try {
    for (const studentKey in marks) {
      // Remove the "id_" prefix
      const studentId = studentKey.replace('id_', '');

      const markData = await Marks.findOneAndUpdate(
        {
          student_id: studentId, // KEEP as string
          class: nameValue,
          section: sectionValue,
          exam_type,
        },
        {
          student_id: studentId,
          class: nameValue,
          section: sectionValue,
          exam_type,
          total,
          date: date,
          marks: marks[studentKey],
        },
        { upsert: true, new: true }
      );
    }

    res.redirect("/teacher");
  } catch (err) {
    console.error("Error uploading marks:", err);
    res.status(500).send("Couldn't upload marks.");
  }
});


marksRouter.get("/availableExams", async (req, res) => {
    const { nameValue, sectionValue } = req.query;

    try {

        const exams = await Marks.aggregate([
            {
                $match: {
                    class: nameValue,
                    section: sectionValue
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

        res.json(exams);

    } catch(err){

        console.log(err);

        res.status(500).json({
            error:"Unable to fetch exams."
        });

    }

});
marksRouter.get("/head/classReport",async(req,res)=>{
  const { nameValue, sectionValue, exam_type,date} = req.query;

  try {
    const students = await studentDetails.find({ class: nameValue, section: sectionValue });
    const subjects = await subjectClass.find({ class: nameValue, section: sectionValue });
    const newDate=date.toString();
    const existingMarks = await Marks.find({ class: nameValue, section: sectionValue, exam_type,date:newDate });

    // Map: student_id (as string) => { subject: marks, ... }
    const marksMap = {};
    existingMarks.forEach(mark => {
    const sid = mark.student_id;
    if (!marksMap[sid]) marksMap[sid] = {};

    // Convert MongoDB Map to plain object
    marksMap[sid] = Object.fromEntries(mark.marks); 
    });

    res.render('marksViewClass', {
      students,
      subjects,
      marksMap,
      nameValue,
      sectionValue,
      exam_type,
      newDate,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Couldn't load marks page.");
  }
})
marksRouter.get("/teacher/classReport",async(req,res)=>{
  const { nameValue, sectionValue, exam } = req.query;
  const [exam_type, date] = exam.split("|");

  try {
    const students = await studentDetails.find({ class: nameValue, section: sectionValue });
    const subjects = await subjectClass.find({ class: nameValue, section: sectionValue });
    const newDate=date.toString();
    const existingMarks = await Marks.find({ class: nameValue, section: sectionValue, exam_type,date:newDate });

    // Map: student_id (as string) => { subject: marks, ... }
    const marksMap = {};
    existingMarks.forEach(mark => {
    const sid = mark.student_id;
    if (!marksMap[sid]) marksMap[sid] = {};

    // Convert MongoDB Map to plain object
    marksMap[sid] = Object.fromEntries(mark.marks); 
    });

    res.render('marksViewClass', {
      students,
      subjects,
      marksMap,
      nameValue,
      sectionValue,
      exam_type,
      newDate,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Couldn't load marks page.");
  }
})
marksRouter.get("/head/studentReport", async (req, res) => {
  const { nameValue, sectionValue, student_id } = req.query;

  try {
    const student = await studentDetails.findOne({ id: student_id });

    const subjects = await subjectClass.find({
      class: nameValue,
      section: sectionValue,
    });

    const existingMarks = await Marks.find({
      class: nameValue,
      section: sectionValue,
      student_id: student_id,
    });

    // Create array of exam marks
    const marksArray = existingMarks.map((mark) => ({
      exam_type: mark.exam_type,
      marks: Object.fromEntries(mark.marks),
    }));

    res.render("marksViewStudent", {
      student,
      subjects,
      marksArray, // use this in EJS
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Couldn't load marks page.");
  }
});
marksRouter.get("/teacher/studentReport", async (req, res) => {
  const { nameValue, sectionValue, student_id } = req.query;

  try {
    const student = await studentDetails.findOne({ id: student_id });

    const subjects = await subjectClass.find({
      class: nameValue,
      section: sectionValue,
    });

    const existingMarks = await Marks.find({
      class: nameValue,
      section: sectionValue,
      student_id: student_id,
    });

    // Create array of exam marks
    const marksArray = existingMarks.map((mark) => ({
      exam_type: mark.exam_type,
      marks: Object.fromEntries(mark.marks),
    }));

    res.render("marksViewStudent", {
      student,
      subjects,
      marksArray, // use this in EJS
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Couldn't load marks page.");
  }
});
marksRouter.get("/student/fullReport", async (req, res) => {
  const { nameValue, sectionValue, student_id } = req.query;

  try {
    const student = await studentDetails.findOne({ id: student_id });

    const subjects = await subjectClass.find({
      class: nameValue,
      section: sectionValue,
    });

    const existingMarks = await Marks.find({
      class: nameValue,
      section: sectionValue,
      student_id: student_id,
    });

    // Create array of exam marks
    const marksArray = existingMarks.map((mark) => ({
      exam_type: mark.exam_type,
      marks: Object.fromEntries(mark.marks),
    }));

    res.render("marksViewStudent", {
      student,
      subjects,
      marksArray, // use this in EJS
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Couldn't load marks page.");
  }
});
marksRouter.get("/student/particularReport", async (req, res) => {
  const {
    exam,
    student_id,sectionValue,nameValue   
} = req.query;

const [exam_type, date] = exam.split("|");

  try {
    const student = await studentDetails.findOne({ id: student_id });
    const newDate=date.toString();

    const subjects = await subjectClass.find({
      class: nameValue,
      section: sectionValue,
    });

    const marksDoc = await Marks.findOne({
    student_id,
    exam_type,
    date

});
    const marks = marksDoc ? {
      ...marksDoc.toObject(),
      marks: Object.fromEntries(marksDoc.marks)  // Convert Map to plain object
    } : null;
    res.render("particularReport", {
      student,
      subjects,
      exam_type,
      marks, // use this in EJS
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Couldn't load marks page.");
  }
});
marksRouter.get("/student/exportReport", async (req, res) => {
  const { nameValue, sectionValue, student_id, exam_type, date } = req.query;

  try {
    const student = await studentDetails.findOne({ id: student_id });
    const subjects = await subjectClass.find({ class: nameValue, section: sectionValue });

    const marksDoc = await Marks.findOne({
      class: nameValue,
      section: sectionValue,
      student_id,
      exam_type,
      date: date.toString(),
    });

    if (!marksDoc) {
      return res.status(404).send("Marks not found.");
    }

    const marks = Object.fromEntries(marksDoc.marks); // Convert Map to plain object

    // Create workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Report");

    // Add title
    worksheet.mergeCells('A1', 'C1');
    worksheet.getCell('A1').value = `Report Card: ${student.name} - Class ${nameValue}${sectionValue}`;
    worksheet.getCell('A1').font = { bold: true, size: 14 };

    // Header row
    worksheet.addRow(['S.No', 'Subject', 'Marks']);

    // Subject rows
    subjects.forEach((subject, index) => {
      worksheet.addRow([
        index + 1,
        subject.name,
        marks[subject.name] ?? '00'
      ]);
    });

    // Set response headers
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=report_${student.name}_${exam_type}.xlsx`);

    // Write workbook to response
    await workbook.xlsx.write(res);
    res.end();

  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating report.");
  }
});
marksRouter.get("/class/exportReport", async (req, res) => {
  const { classValue, sectionValue, exam_type, date } = req.query;

  try {
    const students = await studentDetails.find({ class: classValue, section: sectionValue });
    const subjects = await subjectClass.find({ class: classValue, section: sectionValue });
    const marksDocs = await Marks.find({ class: classValue, section: sectionValue, exam_type, date });

    // Map of studentId => { subjectName: marks }
    const marksMap = {};
    marksDocs.forEach(doc => {
      marksMap[doc.student_id] = Object.fromEntries(doc.marks); // Convert Map to plain object
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Class Report");

    // Title rows
    worksheet.mergeCells('A1', `${String.fromCharCode(68 + subjects.length)}1`);
    worksheet.getCell('A1').value = `Class Report - ${exam_type} Exam - Class ${classValue}${sectionValue}`;
    worksheet.getCell('A1').font = { bold: true, size: 14 };

    // Header row
    const header = ['S.No', 'Student Name', 'Father Name', ...subjects.map(s => s.name)];
    worksheet.addRow(header);

    // Student rows
    students.forEach((student, index) => {
      const studentMarks = marksMap[student.id] || {};
      const row = [
        index + 1,
        student.name,
        student.fatherName,
        ...subjects.map(subject => studentMarks[subject.name] ?? '')
      ];
      worksheet.addRow(row);
    });

    // Set response headers
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=class_report_${classValue}_${sectionValue}_${exam_type}.xlsx`);

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating Excel report.");
  }
});
marksRouter.get("/studentClass/exportReport", async (req, res) => {
  const { studentId, classValue, sectionValue } = req.query;

  try {
    const student = await studentDetails.findOne({ id: studentId });
    const subjects = await subjectClass.find({ class: classValue, section: sectionValue });
    const marksDocs = await Marks.find({ student_id: studentId, class: classValue, section: sectionValue });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Student Report');

    // Title and student details
    worksheet.mergeCells('A1', `${String.fromCharCode(68 + subjects.length)}1`);
    worksheet.getCell('A1').value = `Student Report`;
    worksheet.getCell('A1').font = { size: 14, bold: true };

    worksheet.addRow([]);
    worksheet.addRow(['Name:', student.name]);
    worksheet.addRow(['Father Name:', student.fatherName]);
    worksheet.addRow([]);

    // Table header
    const headerRow = ['Exam', ...subjects.map(subject => subject.name)];
    worksheet.addRow(headerRow);

    // Table body
    marksDocs.forEach(entry => {
      const row = [entry.exam_type];
      subjects.forEach(subject => {
        const mark = entry.marks[subject.name] ?? '00';
        row.push(mark);
      });
      worksheet.addRow(row);
    });

    // Response headers
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=student_report_${student.name}_${studentId}.xlsx`
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to export student report.");
  }
});
marksRouter.get('/', async (req, res) => {
  const { nameValue, sectionValue, exam_type, total,date } = req.query;

  try {
    const students = await studentDetails.find({ class: nameValue, section: sectionValue });
    const subjects = await subjectClass.find({ class: nameValue, section: sectionValue });
    const existingMarks = await Marks.find({ class: nameValue, section: sectionValue, exam_type });

    // Map: student_id (as string) => { subject: marks, ... }
    const marksMap = {};
    existingMarks.forEach(mark => {
    const sid = mark.student_id ;
    if (!marksMap[sid]) marksMap[sid] = {};

    // Convert MongoDB Map to plain object
    marksMap[sid] = Object.fromEntries(mark.marks); 
    });

    res.render('marksEnter', {
      students,
      subjects,
      marksMap,
      nameValue,
      sectionValue,
      exam_type,
      total,
      date,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Couldn't load marks page.");
  }
});
marksRouter.get("/editMarks", async (req, res) => {
  const {
    nameValue,
    sectionValue,
    exam_type,
    total,
    date
  } = req.query;

  try {

    const students = await studentDetails.find({
      class: nameValue,
      section: sectionValue
    });

    const subjects = await subjectClass.find({
      class: nameValue,
      section: sectionValue
    });

    const existingMarks = await Marks.find({
      class: nameValue,
      section: sectionValue,
      exam_type,
      date
    });

    // student_id => { subject : marks }
    const marksMap = {};

    existingMarks.forEach(mark => {
      const sid = mark.student_id;

      if (!marksMap[sid]) {
        marksMap[sid] = {};
      }

      marksMap[sid] = Object.fromEntries(mark.marks);
    });

    res.render("marksEnter", {
      students,
      subjects,
      marksMap,
      nameValue,
      sectionValue,
      exam_type,
      total: existingMarks[0]?.total || "",
      date,
      edit: true
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Couldn't load edit page.");
  }
});

module.exports=marksRouter;