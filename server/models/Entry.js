const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
  description: { type: String },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  startTime: { type: Date, required: true },
});

module.exports = mongoose.model("Entry", entrySchema);
