const mongoose = require('mongoose');

const productiontSchema = new mongoose.Schema({


  // User identifier referencing the User model
  userId: {
    type: Number,
    ref: 'User',
    required: true,
  },
  // Introducer identifier referencing the Introducer model
  introducerId: {
    type: Number,
    ref: 'Introducer',
    required: true,
  },
  // Type of program
  programType: {
    type: String,
    required: true
  },
  // Price charged by technical team
  technicalTeamPrice: {
    type: Number,
    required: true
  },
  // Price charged by executive team
  executiveTeamPrice: {
    type: Number,
    required: true
  },
  // Deadline for payment
  paymentDeadline: {
    type: Date,
    required: true
  },
  // Date payment was made
  paymentDate: {
    type: Date,
    required: true
  },
  // Number of payment installments (1 or 2)
  paymentInstallments: {
    type: Number,
    enum: [1, 2],
    required: true
  },
  // Position in queue
  queuePosition: {
    type: Number
  },
  // RIT's share amount
  ritShare: {
    type: Number,
    required: true
  },
  // Share amount for RIT members
  ritMembersShare: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('productiontSchema', productiontSchema);