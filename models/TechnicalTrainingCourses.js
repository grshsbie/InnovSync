const mongoose = require('mongoose');

const TechnicalTrainingCourses = new mongoose.Schema({
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
  payableAmount: {
    value: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      enum: ['USD', 'IRR'],
      required: true
    }
  },
  RITMembersShare: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  courseCosts: {
    type: Number,
    required: true,
    min: 0
  },
  instructorSharePercentage: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  RITRemainingAmount: {
    type: Number,
    default: function() {
      const afterMembersShare = this.payableAmount.value * (1 - this.RITMembersShare/100);
      const afterCosts = afterMembersShare - this.courseCosts;
      const instructorShare = afterCosts * (this.instructorSharePercentage/100);
      return afterCosts - instructorShare;
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('TechnicalTrainingCourses', TechnicalTrainingCourses);