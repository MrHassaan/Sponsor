const express = require("express");
const router =  express.Router();
const Proposal = require('../models/proposal-model');
const Template = require('../models/template-model');

router.get('/proposal',(req, res) =>{
    res.send("welocome to create event");
});

router.get('/createproposal',(req, res) =>{
    res.send("welocome to create Proposal");
});

router.post('/createproposal', async (req, res) =>{
  const proposalName = req.body.proposalName;
  const proposalText = req.body.proposalText;
  const organizer = req.session.user;

  try {
    const proposal = new Proposal({
      organizer,
      proposalName,
      proposalText
    });
    await proposal.save();
    res.status(200).json({ message: 'Proposal Added Successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/getallproposals',async (req, res) =>{
    try { 
        const organizer = req.session.user;
        const proposals = await Proposal.find({organizer:organizer});
      
        res.json(proposals);
        } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
});

router.get('/viewproposal',(req, res) =>{
    res.send("Proposal Details");
});

router.get('/viewproposal/:id',async (req, res) =>{
    res.send("welocome to view proposal");
});

router.get('/proposals/:id', async (req, res) => {
    
    try {
        // Assuming you are using sessions or JWTs to authenticate users
        const proposalId = req.params.id; // Adjust this based on your authentication logic
        
        // Fetch events organized by the user
        const proposal = await Proposal.find({ _id: proposalId });
  
        // Render the events on the page (you can use a template engine like EJS or send JSON)
        res.json(proposal);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
});

router.put('/editproposal/:id', async (req, res) => {
    try {
      const proposalId = req.params.id;
  
      const {proposalName,proposalText} = req.body;
       // Uploaded logo file
      const organizer = req.session.user;  
      
      const proposalData = {
        organizer,
        proposalName,
        proposalText
      };
 
      const updatedProposal = await Proposal.findByIdAndUpdate(proposalId, proposalData, { new: true });
  
      if (!updatedProposal) {
        return res.status(404).json({ error: 'Proposal not found' });
      }
  
      // Return the updated event as JSON res.json(updatedProposal);
    res.status(200).json({ message: 'Proposal Edited Successfully.' }); 
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  

router.delete('/deleteproposal/:id', async (req, res) => {
    try {
      const proposalId = req.params.id;
      
      // Find the event by ID and delete it
      const deletedProposal = await Proposal.findByIdAndDelete(proposalId);
     
      if (!deletedProposal) {
        return res.status(404).json({ error: 'Proposal not found' });
      }
  
      // Return a success message or any desired response
      res.json({ message: 'Proposal Deleted Successfully' });
      // redirect('/liveevents');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
router.post('/createtemplate', async (req, res) =>{
  const templateName = req.body.templateName;
  const templateImage = req.body.templateImage;
  const templateText = req.body.templateText;

  try {
    const template = new Template({
      templateName,
      templateImage,
      templateText
    });
    await template.save();
    res.status(200).json({ message: 'Template Added Successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/getalltemplates',async (req, res) =>{
  try { 
      const templates = await Template.find();    
      res.json(templates);
      } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
});

router.get('/templates/:id', async (req, res) => {
    
  try {
      // Assuming you are using sessions or JWTs to authenticate users
       const templateId = req.params.id; // Adjust this based on your authentication logic
      // console.log(req.params)
      // Fetch events organized by the user
      const template = await Template.find({ _id: templateId });
      
      // Render the events on the page (you can use a template engine like EJS or send JSON)
      res.json(template);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
});


module.exports=router;