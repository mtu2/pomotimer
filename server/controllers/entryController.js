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
  create: async function (req, res) {
    const description = req.body.description;
    const duration = Number(req.body.duration);

    const newEntry = new Entry({
      description,
      duration,
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
          duration: Number(req.body.duration),
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
};
