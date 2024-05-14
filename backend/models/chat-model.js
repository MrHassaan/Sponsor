// Import mongoose
const mongoose = require('mongoose');

// Define the schema for the contact form
const chatSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Create a Contact model based on the schema
const Chat = mongoose.model('Chat', chatSchema);

// Export the Contact model
module.exports = Chat;
