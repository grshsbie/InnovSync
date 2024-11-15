const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    ritUserId: {
        type: Number,
        required: true,
        min: 1,
        max: 10000,
    },
    introducerId: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    settlementDate: {
        type: Date,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    deliveryDate: {
        type: Date,
        required: true,
    },
    deadlineDate: {
        type: Date,
        required: true,
    },
    ritTechnicianId: {
        type: Number,
        required: true,
        min: 1,
        max: 10000,
    },
    productType: {
        type: Number,
        required: true,
        min: 1,
        max: 10000,
    },
    campaignName: {
        type: String,
        default: '',
    },
    paymentParts: [{
        partNumber: Number,
        amount: Number,
    }],
    stages: [{
        stageId: String,
        title: String,
        defaultStatus: String,
        statusOptions: [String],
        status: { type: String, default: 'Pending' },
    }],
});

module.exports = mongoose.model('Project', ProjectSchema);
