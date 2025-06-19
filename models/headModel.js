const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Define the schema
const headSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        minLength: 3,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    }
});

// Create the model
const head = mongoose.model("head", headSchema);

// Function to register a new user
async function registerUser(id, plainPassword) {
    try {
        // Check if the user already exists in the database
        const existingUser = await head.findOne({ id: id });
        if (existingUser) {
            return;
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

        // Create a new user object with the hashed password
        const head_user = new head({
            id: id,
            password: hashedPassword,
        });

        // Save the new user to the database
        await head_user.save();
        console.log("User registered successfully:", id);
    } catch (error) {
        console.error("Error registering user:", error);
    }
}
registerUser("001","rawjet");

// Export the model for use in other parts of the application
module.exports = head;



