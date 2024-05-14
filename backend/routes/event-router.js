const express = require("express");
const mongoose = require('mongoose');
const router =  express.Router();
const eventcontroller = require('../controllers/event-controller')
const SponsoredEvents = require('../models/sponsoredevents-model');
const User = require('../models/user-model');
const multer = require('multer');

const path = require('path');
const Event = require('../models/event-model');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); 
  },
});

const upload = multer({ storage: storage });
// const User = require("../models/user-model");
router.get('/createevent',(req, res) =>{
    res.send("welocome to create event");
});

// router.post('/createevent',eventcontroller.CreateEvent);
router.post('/createevent',upload.single('eventlogo'),async (req, res) => {
  const { title, eventdesc, eventtype, location, startdate, enddate, numPackages, eventlogo } = req.body;
  const organizer = req.session.user;
  if (!title || !eventdesc || !eventtype || !location || !startdate || !enddate || !numPackages) {
    return res.status(422).json({ error: 'Missing Field.' });
  }

  try {
    // Convert the uploaded file to a Buffer
    const normalizedPath = path.normalize(req.file.path);
    const imagePath = normalizedPath.replace(/\\/g, '/');
    const packages = JSON.parse(req.body.packages);
    const event = new Event({
      organizer,
      title,
      eventdesc,
      eventtype,
      location,
      startdate,
      enddate,
      eventlogo:imagePath, // Store file data as Buffer
      numPackages,
      packages,
    });
    await event.save();
    res.status(200).json({ message: 'Event Added Successfully.' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/viewevents',async (req, res) =>{
  res.send("welocome to view event");
});

router.get('/eventdetails', async (req, res) => {
    

  res.send("welocome to view event details");
});

router.get('/eventdetails/:id', async (req, res) => {
  res.send("welocome to view event");
});

router.get('/getevents', async (req, res) => {
  try {
    // Assuming you are using sessions or JWTs to authenticate users
    const userId = req.session.user; // Adjust this based on your authentication logic
    const eventType = req.query.eventtype;
    const eventLocation = req.query.location;
    const eventTitle = req.query.title;
    const eventDate = req.query.startdate;
    
let query = { organizer: userId };
    // Add event type to the query if provided
    if (eventType) {
      query.eventtype = eventType;
    }
  
    // Add event location regex to the query if provided
    if (eventLocation) {
      const regexLocation = new RegExp(`\\b${eventLocation}\\b`, 'i');
      query.location = { $regex: regexLocation };
    }
  
    if (eventTitle) {
      
      const regexTitle = new RegExp(`${eventTitle}`, 'i');
      query.title = { $regex: regexTitle }; 
    }
    if(eventDate){query.startdate = eventDate;}
    const events = await Event.find(query);
    res.json(events);    
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/getallevents', async (req, res) => {
  const eventType = req.query.eventtype;
  const eventLocation = req.query.location;
  const eventTitle = req.query.title;
  try {
    let query = {};

    // Add event type to the query if provided
    if (eventType) {
      query.eventtype = eventType;
    }
  
    // Add event location regex to the query if provided
    if (eventLocation) {
      const regexLocation = new RegExp(`\\b${eventLocation}\\b`, 'i');
      query.location = { $regex: regexLocation };
    }
  
    if (eventTitle) {
      
      const regexTitle = new RegExp(`${eventTitle}`, 'i');
      query.title = { $regex: regexTitle }; 
    }
    query.startdate = { $gte: new Date() };

    const events = await Event.find(query);
    res.json(events);
    } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/geteventsadmin', async (req, res) => {
  const eventTitle = req.query.title;
  try {
    let query = {};
  
    if (eventTitle) {
      
      const regexTitle = new RegExp(`${eventTitle}`, 'i');
      query.title = { $regex: regexTitle }; 
    }
    query.startdate = { $gte: new Date() };

    const events = await Event.find(query);
    res.json(events);
    } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/events', async (req, res) => {
  res.send("welocome to events");
});

router.get('/adminevents', async (req, res) => {
  res.send("welocome to events");
});



router.get('/events/:id', async (req, res) => {
    
  try {
      // Assuming you are using sessions or JWTs to authenticate users
      const eventId = req.params.id; // Adjust this based on your authentication logic
      
      // Fetch events organized by the user
      const event = await Event.find({ _id: eventId });

      // Render the events on the page (you can use a template engine like EJS or send JSON)
      res.json(event);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
});


router.get('/editevent',async (req, res) =>{
  res.send("welocome to edit event");
});

router.get('/editevent/:id',async (req, res) =>{
  res.send("welocome to create event");
});

router.put('/editevent/:id', upload.single('eventlogo'), async (req, res) => {
  try {
    const eventId = req.params.id;

    const { title, eventdesc, eventtype, location, startdate, enddate, numPackages, eventlogo } = req.body;
     // Uploaded logo file
    const organizer = req.session.user;

    if (!title || !eventdesc || !eventtype || !location || !startdate || !enddate || !numPackages) {
      return res.status(422).json({ error: 'Missing Field.' });
    }

    
    const eventData = {
      organizer,
      title,
      eventdesc,
      eventtype,
      location,
      startdate,
      enddate,
      eventlogo,
      numPackages,
    };
    if(req.file){
      const logo = req.file;
      const normalizedPath = path.normalize(logo.path);
      const imagePath = normalizedPath.replace(/\\/g, '/');
      eventData.eventlogo = imagePath;
    }

    // Find the event by ID and update it with the new data
    const updatedEvent = await Event.findByIdAndUpdate(eventId, eventData, { new: true });

    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Return the updated event as JSON
    res.json(updatedEvent);

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/deleteevent/:id', async (req, res) => {
  try {
    const eventId = req.params.id;
    
    // Find the event by ID and delete it
    const deletedEvent = await Event.findByIdAndDelete(eventId);
   
    if (!deletedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Return a success message or any desired response
    res.json({ message: 'Event Deleted Successfully' });
    // redirect('/liveevents');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/myevents',async (req, res) =>{
  res.send("welocome to My Events");
});

router.get('/eventsthatgetsponsored',async (req, res) =>{
  res.send("welocome to My Events");
});

router.post('/sponsoredevents', async (req, res) => {
  try {
    const sponsorId = req.session.user.toString();
    const {eventId, packageId } = req.body;

    // Create a new SponsoredEvents document
    const sponsoredEvent = new SponsoredEvents({
      sponsorId,
      eventId,
      packageId,
      // Other fields if needed
    });

    // Save the sponsored event to the database
    await sponsoredEvent.save();

    res.status(201).json({ message: 'Sponsored event saved successfully' });
  } catch (err) {
    console.error('Error saving sponsored event:', err);
    res.status(500).json({ error: 'Error saving sponsored event' });
  }
});

router.get('/getallsponsoredevents', async (req, res) => {
  try {
    const sponsorId = req.session.user;
    const sponsoredEvents = await SponsoredEvents.find({ sponsorId: sponsorId })
    const eventIds = sponsoredEvents.map(event => event.eventId);

    // Step 3: Fetch event data from Event collection using the extracted IDs
    const events = await Event.find({ _id: { $in: eventIds } });

    res.json( events );
    } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/checksponsoredevents/:id', async (req, res) => {
    
  try {
      // Assuming you are using sessions or JWTs to authenticate users
      const eventId = req.params.id; // Adjust this based on your authentication logic
      const sponsorId = req.session.user;
      // Fetch events organized by the user
      const event = await SponsoredEvents.findOne({ eventId: eventId, sponsorId: sponsorId });


      // Render the events on the page (you can use a template engine like EJS or send JSON)
      if (event) {
        // Event is sponsored by the user, send true
        res.json({packageId:event.packageId ,sponsored: true });
      } else {
        // Event is not sponsored by the user, send false
        res.json({ sponsored: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
});

// router.get('/getorganizedevents', async (req, res) => {
//   try {
//     const organizerId = req.session.user;

//     // Step 1: Fetch sponsored events organized by the organizer
//     const sponsoredEvents = await SponsoredEvents.find();

//     // Step 2: Extract event IDs from sponsoredEvents
//     const eventIds = sponsoredEvents.map(event => event.eventId);
//     console.log(eventIds);
//     // Step 3: Fetch event data organized by the organizer and include the selected package and sponsor name
//     const events = await Event.find({ _id: { $in: eventIds }, organizer: organizerId });
//     const organizedSponsoredEvents = await Promise.all(events.map(async event => {
//       const sponsorEvent = sponsoredEvents.find(sEvent => sEvent.eventId.toString() === event._id.toString());
//       const sponsor = await User.findById(sponsorEvent.sponsorId);
//       const selectedPackage = event.packages.find(pkg => pkg._id.toString() === sponsorEvent.packageId.toString());
//       return {
//         _id: event._id,
//         title: event.title,
//         eventlogo:event.eventlogo,
//         selectedPackage: {
//           _id: selectedPackage._id,
//           amount: selectedPackage.amount,
//           desc: selectedPackage.desc,
//         },
//         sponsorName: sponsor ? sponsor.fname : '', // Assuming the sponsor's first name is stored in fname field
//       };
//     }));
  
//     res.json(organizedSponsoredEvents);
//     // res.json( events );
//     } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });


router.get('/getorganizedevents', async (req, res) => {
  try {
    const organizerId = req.session.user;

    // Step 1: Fetch all sponsored events
    const sponsoredEvents = await SponsoredEvents.find();

    // Step 2: Extract unique event IDs from sponsored events
    const eventIds = [...new Set(sponsoredEvents.map(event => event.eventId))];

    // Step 3: Fetch event data from Event collection using the extracted IDs
    const events = await Event.find({ _id: { $in: eventIds }, organizer: organizerId });

    // Step 4: Create an object to store organized events with sponsor details
    const organizedEvents = {};

    // Step 5: Iterate through each event to get sponsor names and selected packages
    for (const event of events) {
      organizedEvents[event._id] = {
        _id: event._id,
        title: event.title,
        eventlogo: event.eventlogo,
        sponsorPackages: [],
      };

      // Find sponsor details and selected packages for this event
      for (const sponsoredEvent of sponsoredEvents) {
        if (sponsoredEvent.eventId.toString() === event._id.toString()) {
          const sponsor = await User.findById(sponsoredEvent.sponsorId);
          const selectedPackage = event.packages.find(pkg => pkg._id.toString() === sponsoredEvent.packageId.toString());
          if (sponsor && selectedPackage) {
            organizedEvents[event._id].sponsorPackages.push({
              sponsorName: sponsor.fname, // Assuming the sponsor's first name is stored in fname field
              selectedPackage: {
                _id: selectedPackage._id,
                amount: selectedPackage.amount,
                desc: selectedPackage.desc,
              },
            });
          }
        }
      }
    }

    res.json(Object.values(organizedEvents)); // Convert object to array and send in response
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports=router;