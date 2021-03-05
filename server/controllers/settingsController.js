const User = require("../models/User");

module.exports = {
  get: async function (req, res) {
    try {
      const user = await User.findById(req.user._id);
      const settings = user.settings;
      res.json(settings);
    } catch (err) {
      res.status(400).json("Error: " + err);
    }
  },
  update: async function (req, res) {
    try {
      const user = await User.findById(req.user._id);
      user.settings = {
        pomodoroTime: Number(req.body.pomodoroTime),
        shortBreakTime: Number(req.body.shortBreakTime),
        longBreakTime: Number(req.body.longBreakTime),
        isMuted: Boolean(req.body.isMuted),
        showCountdown: Boolean(req.body.showCountdown),
        showOnlyPomodoros: Boolean(req.body.showOnlyPomodoros),
        pomodoroEmoji: req.body.pomodoroEmoji,
        shortBreakEmoji: req.body.shortBreakEmoji,
        longBreakEmoji: req.body.longBreakEmoji,
      };
      await user.save();
      res.json(user.settings); // send updated entry
    } catch (err) {
      res.status(400).json("Error: " + err);
    }
  },
};
