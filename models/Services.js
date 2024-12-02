const servicesSchema = new mongoose.Schema({
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
  depositDate: {
    type: Date,
    required: true
  },
  serviceType: {
    type: String,
    enum: ['website_design', 'english_language', 'box_foam_design', 'product_photography',
           'personal_photography', 'video_recording', 'video_recording_editing', 'technical_map_render'],
    required: true
  },
  competitionName: {
    type: String,
    required: true
  },
  ritShare: {
    type: Number,
    required: true
  },
  ritMembersShare: {
    type: Number,
    required: true
  },
  expenses: {
    type: Number,
    required: true
  },
  depositAmount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    enum: ['rial', 'toman'],
    required: true
  }
}, {
  timestamps: true
});

const Payment = mongoose.model('servicesSchema', servicesSchema);