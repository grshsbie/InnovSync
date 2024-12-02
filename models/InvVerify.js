const mongoose = require('mongoose');

const InvVerifySchema = new mongoose.Schema({
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
  persianName: {
    type: String,
    required: true
  },
  englishName: {
    type: String,
    required: true
  },
  requestFrom: {
    type: String,
    required: true
  },
  paymentDate: {
    type: Date,
    required: true
  },
  deliveryDateToDoctor: {
    type: Date,
    required: true
  },
  documents: {
    files: [{
      type: String // File paths/URLs
    }],
    isApproved: {
      type: Boolean,
      default: false
    }
  },
  namesDeliveryDate: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('InvVerify', InvVerifySchema);