const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema(
  {
    description: { type: String },
    duration: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Entry", entrySchema);
