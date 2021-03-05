const router = require("express").Router();
const authRoutes = require("./authRoutes");
const entryRoutes = require("./entryRoutes");
const settingsRoutes = require("./settingsRoutes");

// Auth routes
router.use("", authRoutes);
// API routes
router.use("/api/entries", entryRoutes);
router.use("/api/settings", settingsRoutes);

module.exports = router;
