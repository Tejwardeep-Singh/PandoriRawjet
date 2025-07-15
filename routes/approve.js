const express = require("express");
const leaveRouter = express.Router();
const { leaveRequestTeacher,leaveRequestStudent} = require("../models/leaveRequest");

leaveRouter.post("/teacher", async function(req, res) {
    const { leaveId } = req.body; // Access leaveId from the query parameter
    if (!leaveId) {
        return res.status(400).send("Missing leaveId");
    }
    
    try {
        // Find the leave request by its ID and update its status to "Approved"
        const updatedLeave = await leaveRequestTeacher.findByIdAndUpdate(
            leaveId,
            { status: "Approved" },
            { new: true }  // This option returns the updated document
        );

        if (!updatedLeave) {
            return res.status(404).send("Leave request not found");
        }
        res.redirect("/head");  // Redirect to the head page after approval

        // Redirect to the appropriate page (e.g., /head)
    } catch (err) {
        console.error("Error approving leave:", err);
        res.status(500).send("Internal Server Error");
    }
});

leaveRouter.post("/student", async function(req, res) {
    const { leaveId } = req.body; // Access leaveId from the query parameter
    if (!leaveId) {
        return res.status(400).send("Missing leaveId");
    }
    
    try {
        // Find the leave request by its ID and update its status to "Approved"
        const updatedLeave = await leaveRequestStudent.findByIdAndUpdate(
            leaveId,
            { status: "Approved" },
            { new: true }  // This option returns the updated document
        );
        alert("leave approved");
        if (!updatedLeave) {
            return res.status(404).send("Leave request not found");
        }
        res.redirect("/teacher");  

    } catch (err) {
        console.error("Error approving leave:", err);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = leaveRouter;