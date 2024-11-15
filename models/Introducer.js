const mongoose = require('mongoose');

const IntroducerSchema = new mongoose.Schema({
    introducerId: {
        type: Number,
        required: true,
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

module.exports = mongoose.model('Introducer', IntroducerSchema);
