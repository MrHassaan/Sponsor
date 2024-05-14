const express = require("express");
const router =  express.Router();
const Chat = require('../models/chat-model');
const User = require("../models/user-model");
const {io,getReceiverSocketId } = require('../socket/socket.js');

router.get('/chat',(req, res) =>{
    res.send("welocome to chat");
});

router.post('/send-message', async (req, res) => {
    try {
        const sender = req.session.user.toString();
        const {  receiver, message } = req.body;

        // Create a timestamp for the current date and time
        const timestamp = new Date();

        // Create a new chat document with sender, receiver, message, and timestamp
        const newMessage = new Chat({
            sender,
            receiver,
            message,
            timestamp
        });

        // Save the new chat message to the database
        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiver);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage);
        }
        // Respond with a success message
        res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        // If an error occurs, send a server error response
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
});

router.get('/mycontacts', async (req, res) => {
    try {
        const userId = req.session.user.toString();
        const usertype = req.session.usertype;
        
        // console.log(req.query.organizerId);
        let UserIdsSet,UserIds;
//  console.log(usertype);
        // Find contacts based on sender ID
        // const contacts = await Chat.find({ sender: senderId });
 
        if(usertype === 'sponsor'){
            const contacts = await Chat.find({sender: userId});
            UserIdsSet = new Set(contacts.map(contact => contact.receiver));
            UserIds = Array.from(UserIdsSet);
            if(req.query.organizerId){
                const newContactId =  req.query.organizerId;
                if (!UserIdsSet.has(newContactId)) {
                    // If it doesn't exist, add it to the Set
                    UserIds.unshift(newContactId);
                }
            }

        } else {
            const contacts = await Chat.find({receiver: userId});
            // console.log(contacts)
            UserIdsSet = new Set(contacts.map(contact => contact.sender));
            UserIds = Array.from(UserIdsSet);
        }
        

         
         
        // Convert the Set back to an array
        
        
        const userPromises = UserIds.map(async (userId) => {
            // Fetch user details for each contact's receiver ID
            const user = await User.findById(userId);
            return {
                
                receiverId:userId,
                receiverFullName: user ? user.fname : "Unknown",
                 // Assuming fullName is a field in your User model
                // Include other properties from contact as needed
            };
        });

        const contactsWithUserDetails = await Promise.all(userPromises);
        
        // Respond with the contacts including receiver full names
        res.status(200).json(contactsWithUserDetails);
    } catch (error) {
        // If an error occurs, send a server error response
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
});

router.get('/messages', async (req, res) => {
    try {
        const senderId = req.session.user.toString(); // Get the current user's id
        const receiverId = req.query.receiverId;
        // Fetch messages where sender id is equal to receiver id or receiver id is equal to sender id
        const messages = await Chat.find({
            $or: [
                { sender: senderId, receiver: receiverId },
                { sender: receiverId, receiver: senderId }
            ]
        }).sort({ timestamp: 1 }); // Sort messages by timestamp in ascending order

        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports=router; 
