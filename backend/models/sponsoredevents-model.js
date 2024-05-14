const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define SponsoredEvents schema
const SponsoredEventsSchema = new Schema({
    sponsorId: {
        type: String,
        required: true
    },
    eventId: {
        type: String,
        required: true
    },
    packageId: {
        type: String,
        required: true
    },
    // Other fields if needed
});

// Create and export the SponsoredEvents model
const SponsoredEvents = mongoose.model('SponsoredEvents', SponsoredEventsSchema);
module.exports = SponsoredEvents;
 