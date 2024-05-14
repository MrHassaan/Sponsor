const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
  organizer: {
    type: String,
    required: true
  },
  proposalName: {
    type: String,
    required: true
  },
  proposalText: {
    type: String,
    required: true
  }
});

const Proposal = mongoose.model('Proposal', proposalSchema);

module.exports = Proposal;
