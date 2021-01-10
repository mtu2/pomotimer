const router = require("express").Router();
const entryRoutes = require("./entryRoutes");

// API routes
router.use("/api/entries", entryRoutes);

module.exports = router;
