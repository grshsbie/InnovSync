const mongoose = require('mongoose');

const RitTechnicianSchema = new mongoose.Schema({
    technicianId: {
        type: Number,
        required: true,
        unique: true,
        min: 1,
        max: 10000,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('RitTechnician', RitTechnicianSchema);
