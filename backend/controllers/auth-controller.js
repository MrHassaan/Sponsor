const User = require("../models/user-model");
const Contact = require("../models/contact-model")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const home = async (req,res) => {
    try {
        res.status(200).send("home");
    } catch (error) {
        res.status(400).send("Error Occured");
    }
}


const login = async (req,res) => {
    try {
        let token;
        const { email, password} = req.body;
    
        if( !email || !password ){
            return res.status(400).json({error:"Missing Field."});
        }
        const userExist = await User.findOne({email:email});
        
        if(userExist){
             const isMatch = await bcrypt.compare(password,userExist.password);
             token = await userExist.generateAuthToken();
             res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+25892000000),
                httpOnly:true
             });

             if(!isMatch){
                res.status(400).json({error:"Invalid Email or Password."});
             } else {
                req.session.user = userExist._id;
                res.status(200).json({user:userExist});
             }
        }else{       
            res.status(400).json({error:"Invalid Email or Password."});
        }
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

const signup = async (req,res) => {
    try {
        const {fname, email, password, usertype} = req.body;
        const userExist = await User.findOne({email:email});
        if(userExist){
            return res.status(422).json({error:"User Already Registered."});
        } else {
            const user = new User({fname, email, password, usertype});
            req.session.user = user._id;
            await user.save();
    
            res.status(200).json({message:"User Registered Successfully."});
        }      
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

const userprofile =  async (req, res) => {
    const userId = req.session.user;
    
    try {
      // Fetch user data by ID
      const user = await User.findById(userId);
      
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.status(200).json(user); // Send user data for editing
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
}

const updateprofile =  async (req, res) => {
    const userId = req.session.user;
    const { fname, email } = req.body;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({error:"User not found."});
      }
      if( fname === user.fname && email === user.email){
        return res.status(402).json({message:"Not any change"});
      }
      // Check if the new email already exists and it's not the user's current email
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== userId.toString()) {
        return res.status(400).json({error:"Email not available."});
      }
  
      // Update user data
      user.fname = fname;
      user.email = email;
      const updatedUser = await user.save();
      
      res.status(200).json({updatedUser:updatedUser,message:"Profile updated successfully"});
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
}  

const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        if(oldPassword === newPassword){
            return res.status(402).json({ error: "New password cannot be same as old password." });
        }

        const userId = req.session.user;

        // Fetch user from database
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        // Verify old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid old password." });
        }

  

        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: "Password updated successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

const saveMessage = async (req, res) => {
    try {
        const { fname, email, subject, message } = req.body;

        // Create a new contact document
        const newContact = new Contact({
            fname,
            email,
            subject,
            message
        });

        // Save the contact data to the database
        await newContact.save();

        res.status(200).json({ message: "Message received successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const adminUsers = async (req, res) => {
    const userName = req.query.fname;
    try {
      let query = {};
    
      if (userName) {
        
        const regexTitle = new RegExp(`${userName}`, 'i');
        query.fname = { $regex: regexTitle }; 
      }
      
      const users = await User.find(query);
      res.json(users);
      } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };

module.exports = {home,login,signup,userprofile,updateprofile,changePassword,saveMessage,adminUsers}