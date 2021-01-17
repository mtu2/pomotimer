const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
  description: { type: String },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  startTime: { type: Date, required: true },
});

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  displayName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  entries: { type: [entrySchema], default: [] },
});

module.exports = mongoose.model("User", userSchema);
