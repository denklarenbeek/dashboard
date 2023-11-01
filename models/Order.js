const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
    },
    date: {
        type: Date,
    },
    debitor_name: {
        type: String,
    },
    sales_rep: {
        type: String,
    },
    value: {
        type: Number,
    },
    category: {
        type: String,
    },
});

module.exports = mongoose.model("Order", orderSchema);
