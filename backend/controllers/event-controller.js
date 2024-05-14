const Event = require("../models/event-model");

const CreateEvent = async (req, res) => {
    console.log(req.body);
  const { title, eventdesc, eventtype, location, startdate, enddate, numPackages, eventlogo } = req.body;
  const organizer = req.session.user;
  console.log(organizer);
  console.log(req.body);
  if (!title || !eventdesc || !eventtype || !location || !startdate || !enddate || !eventlogo || !numPackages) {
    return res.status(422).json({ error: 'Missing Field.' });
  }

  try {
    // Convert the uploaded file to a Buffer
    const logoData = eventlogo.buffer;
    const contentType = eventlogo.mimetype;

    const packages = [];
    for (let i = 0; i < numPackages; i++) {
      const { amount, desc } = req.body.packages[i];
      packages.push({ amount, desc });
    }

    const event = new Event({
      organizer,
      title,
      eventdesc,
      eventtype,
      location,
      startdate,
      enddate,
      eventlogo: { data: logoData, contentType }, // Store file data as Buffer
      numPackages,
      packages,
    });

    await event.save();

    res.status(200).json({ message: 'Event Added Successfully.' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports ={CreateEvent};
