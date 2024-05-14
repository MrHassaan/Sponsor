// Import necessary modules
const express = require('express');
const bcrypt = require('bcryptjs'); // For hashing passwords
const Admin = require('../models/admin-model'); // Import Admin model
const jwt = require('jsonwebtoken');
// Create a router instance
const router = express.Router();

router.post('/createadmin', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if admin with given email exists
        let admin = await Admin.findOne({ email });
        if (!admin) {
            // Create a new admin if not found
            admin = new Admin({ email, password });
            await admin.save();
            return res.status(201).json({ message: 'Admin created successfully' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Admin login GET route (render login form)
router.get('/adminlogin', (req, res) => {
    res.status(200).json({ message: 'Welcome to Admin login' }); // Assuming you use a template engine like EJS or Pug
});



// Admin login POST route (handle login form submission)
router.post('/adminlogin', async (req, res) => {
    let token;
    const { email, password } = req.body;

    try {
        // Check if admin with given email exists
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare password hash
        const isMatch = await bcrypt.compare(password, admin.password);
        // token = await admin.generateAuthToken();
        //      res.cookie("jwtoken",token,{
        //         expires:new Date(Date.now()+25892000000),
        //         httpOnly:true
        //      });
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        req.session.user = admin._id;
        // Admin login successful
        res.status(200).json({ message: 'Admin login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/admindashboard', (req, res) => {
    res.status(200).json({ message: 'Welcome to Admin Dashboard' }); // Assuming you use a template engine like EJS or Pug
});

router.get('/adminlogout',(req, res) =>{
    // res.clearCookie('jwtoken', { path: '/adminlogin' });
  
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).send('Error logging out');
    } else {
      res.status(200).send('Logout successful');
    }
  });   
});

module.exports = router;
