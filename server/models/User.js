const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
  description: { type: String },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  startTime: { type: Date, required: true },
});

const settingsSchema = new mongoose.Schema({
  pomodoroTime: { type: Number, default: 1500000, required: true },
  shortBreakTime: { type: Number, default: 300000, required: true },
  longBreakTime: { type: Number, default: 900000, required: true },
  isMuted: { type: Boolean, default: false, required: true },
  showCountdown: { type: Boolean, default: true, required: true },
  showOnlyPomodoros: { type: Boolean, default: false, required: true },
  pomodoroEmoji: { type: String, default: "🍅", required: true },
  shortBreakEmoji: { type: String, default: "☕", required: true },
  longBreakEmoji: { type: String, default: "🍺", required: true },
});

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  displayName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  entries: { type: [entrySchema], default: [], required: true },
  settings: {
    type: settingsSchema,
    default: () => ({}), // settings defaults to an empty object wrt defaults that settingsSchema has
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
