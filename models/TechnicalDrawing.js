const mongoose = require('mongoose');


const TechnicalMapSchema = new mongoose.Schema({
  userId: {
    type: Number,
    ref: 'User',
    required: true,
  },
  introducerId: {
    type: Number,
    ref: 'Introducer',
    required: true,
  },
  paymentAmount: {
    type: Number,
    required: true,
  },
  paymentDate: {
    type: Date,
    required: true,
  },
  sentToTechTeamDate: {
    type: Date,
    required: true,
  },
  ritShare: {
    type: Number,
    required: true,
  },
  ritMembersShare: {
    type: Number,
    required: true,
  },
  technicianId: {
    type: Number,
    ref: 'RitTechnician',
    required: true,
  },
  drawingAmount: {
    type: Number,
    required: true,
  },
  mapType: {
    type: String,
    enum: ['Drafting for Declaration', 'Feasibility Study with Manufacturing Capability'],
    required: true,
  },
  deliveryDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('TechnicalDrawing', TechnicalMapSchema);
