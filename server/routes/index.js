const router = require("express").Router();
const authRoutes = require("./authRoutes");
const entryRoutes = require("./entryRoutes");

// Auth routes
router.use("/", authRoutes);
// API routes
router.use("/api/entries", entryRoutes);

module.exports = router;
