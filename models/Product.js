const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productId: {
        type: Number,
        required: true,
        unique: true,
        min: 1,
        max: 10000,
    },
    productName: {
        type: String,
        required: true,
    },
    stages: [{
        stageId: String,
        title: String,
        defaultStatus: String,
        statusOptions: [String],
    }],
});

module.exports = mongoose.model('Product', ProductSchema);
