const Entry = require("../models/Entry");

module.exports = {
  findAll: async function (req, res) {
    try {
      const entries = await Entry.find();
      res.json(entries);
    } catch (err) {
      res.status(400).json("Error: " + err);
    }
  },
  deleteAll: async function (req, res) {
    try {
      await Entry.deleteMany();
      res.json("All entries deleted.");
    } catch (err) {
      res.status(400).json("Error: " + err);
    }
  },
  create: async function (req, res) {
    const description = req.body.description;
    const type = req.body.type;
    const duration = Number(req.body.duration);
    const startTime = Date(req.body.startTime);

    const newEntry = new Entry({
      description,
      type,
      duration,
      startTime,
    });

    try {
      await newEntry.save();
      res.json("Entry added.");
    } catch (err) {
      res.status(400).json("Error: " + err);
    }
  },
  findById: async function (req, res) {
    try {
      const entry = await Entry.findById(req.params.id);
      res.json(entry);
    } catch (err) {
      res.status(400).json("Error: " + err);
    }
  },
  update: async function (req, res) {
    try {
      await Entry.updateOne(
        { _id: req.params.id },
        {
          description: req.body.description,
          type: req.body.type,
          duration: Number(req.body.duration),
          startTime: Date(req.body.startTime),
        }
      );
      res.json("Entry updated.");
    } catch (err) {
      res.status(400).json("Error: " + err);
    }
  },
  delete: async function (req, res) {
    try {
      await Entry.deleteOne({ _id: req.params.id });
      res.json("Entry deleted.");
    } catch (err) {
      res.status(400).json("Error: " + err);
    }
  },

  // dev
  createMultiple: async function (req, res) {
    try {
      await Entry.insertMany(req.body.entries);
      res.json("Entries added.");
    } catch (err) {
      res.status(400).json("Error: " + err);
    }
  },
};
