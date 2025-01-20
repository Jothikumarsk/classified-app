const mongoose = require("mongoose");

const oldItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    seller: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    image: { type: String },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("OldItem", oldItemSchema);
