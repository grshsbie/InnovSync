const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const competitionSchema = new Schema({
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
  competitionName: {
    type: String,
    required: true
  },
  websiteDesign: {
    type: Boolean,
    default: false,
    description: 'Design fee split 50% with RIT, hosting/domain by client'
  },
  englishLanguage: {
    type: Boolean,
    default: false
  },
  boxAndFoamDesign: {
    type: Boolean,
    default: false
  },
  productPhotography: {
    type: Boolean,
    default: false
  },
  personalPhotography: {
    type: Boolean,
    default: false
  },
  videoRecording: {
    type: Boolean,
    default: false
  },
  videoEditingAndRecording: {
    type: Boolean,
    default: false
  },
  technicalDrawingRender: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Competition', competitionSchema);