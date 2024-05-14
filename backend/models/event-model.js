const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  amount: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  }
});

const eventSchema = new mongoose.Schema({
  organizer: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  eventdesc: {
    type: String,
    required: true
  },
  eventtype: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  startdate: {
    type: Date,
    required: true
  },
  enddate: {
    type: Date,
    required: true
  },
  eventlogo: {
    type: String,
    required: true
  },
  numPackages: {
    type: Number,
    required: true
  },
  packages: [packageSchema] // Array of package objects
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
