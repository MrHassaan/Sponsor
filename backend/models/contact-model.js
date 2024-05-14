// Import mongoose
const mongoose = require('mongoose');

// Define the schema for the contact form
const contactSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

// Create a Contact model based on the schema
const Contact = mongoose.model('Contact', contactSchema);

// Export the Contact model
module.exports = Contact;
