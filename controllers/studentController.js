const jwt = require('jsonwebtoken');
const express = require('express');
const studentRouter = express.Router();
const studentModel = require('../models/studentModel');
const bcrypt = require('bcrypt');
const generateStudentToken = require('../utils/generateStudentTokens');


studentRouter.post('/studentLogin', async (req, res) => {
    const { id, password } = req.body;

    try {
        let student = await studentModel.findOne({ id: Number(id) });

        if (!student) {
            return res.status(400).send("student not found");
        }

        const isPasswordValid = await bcrypt.compare(password, student.password);

        if (isPasswordValid) {
            // Generate token and send it as a cookie or response
            const token = generateStudentToken(student);
            res.cookie('token', token, { httpOnly: true });

            // Redirect to the student page
            return res.redirect('/student');
        } else {
            return res.status(400).send("Password incorrect");
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal server error");
    }
});

module.exports = studentRouter;
