const express=require("express");
const headModel=require("../models/headModel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const generateToken= require("../utils/generateTokens");
const router = express.Router();


router.post('/headLogin', async (req, res) => {
    const { id, password } = req.body;

    try {
        // Find the head user by ID
        let head = await headModel.findOne({id});

        if (!head) {
            return res.status(400).send("username incorrect"); // Proper error response
        }

        // Compare the password
        bcrypt.compare(password, head.password, function (err, result) {
            if (err) {
                return res.status(500).send("Internal server error"); // Handle bcrypt errors
            }

            if (result) {
                // Password matches, generate a token
                let token = generateToken(head);

                // Send the token as a cookie
                res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' }); // Consider secure cookie in production

                // Redirect to head's page (assuming 'head' is the dashboard view)
                return res.redirect('/head');
            } else {
                return res.status(400).send(" Password incorrect");
            }
        });
    } catch (err) {
        return res.status(500).send("Internal server error"); // Catch any potential DB errors
    }
});
module.exports=router;

