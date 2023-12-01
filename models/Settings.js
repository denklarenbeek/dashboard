const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
    targetQ4: Number,
});

module.exports = mongoose.model("Settings", settingsSchema);
