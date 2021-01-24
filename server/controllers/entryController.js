const User = require("../models/User");

module.exports = {
  findAll: async function (req, res) {
    try {
      const user = await User.findById(req.user._id);
      const entries = user.entries;
      res.json(entries);
    } catch (err) {
      res.status(400).json("Error: " + err);
    }
  },
  deleteAll: async function (req, res) {
    try {
      const user = await User.findById(req.user._id);
      user.entries = [];
      await user.save();
      res.json(user); // send updated user
    } catch (err) {
      res.status(400).json("Error: " + err);
    }
  },
  create: async function (req, res) {
    const description = req.body.description;
    const type = req.body.type;
    const duration = Number(req.body.duration);
    const startTime = new Date(req.body.startTime);

    const newEntry = {
      description,
      type,
      duration,
      startTime,
    };

    try {
      const user = await User.findById(req.user._id);
      user.entries.push(newEntry);
      await user.save();
      res.json(user.entries[user.entries.length - 1]); // send created entry
    } catch (err) {
      res.status(400).json("Error: " + err);
    }
  },
  findById: async function (req, res) {
    try {
      const user = await User.findById(req.user._id);
      const entry = user.entries.id(req.params.entryId);
      res.json(entry);
    } catch (err) {
      res.status(400).json("Error: " + err);
    }
  },
  update: async function (req, res) {
    try {
      const user = await User.findById(req.user._id);
      const entry = user.entries.id(req.params.entryId);
      entry.set({
        description: req.body.description,
        type: req.body.type,
        duration: Number(req.body.duration),
        startTime: new Date(req.body.startTime),
      });
      await user.save();
      res.json(user.entries.id(req.params.entryId)); // send updated entry
    } catch (err) {
      res.status(400).json("Error: " + err);
    }
  },
  delete: async function (req, res) {
    try {
      const user = await User.findById(req.user._id);
      const entry = user.entries.id(req.params.entryId);
      entry.remove();
      await user.save();
      res.json(user.entries); // send updated entries
    } catch (err) {
      res.status(400).json("Error: " + err);
    }
  },

  // dev
  createMultiple: async function (req, res) {
    try {
      // req.body._id for dev
      const user = await User.findById(req.body._id);
      req.body.entries.forEach((entry) => {
        user.entries.push(entry);
      });
      await user.save();
      res.json(user.entries); // send updated entries
    } catch (err) {
      res.status(400).json("Error: " + err);
    }
  },
};
