const router = require("express").Router();
const settingsController = require("../controllers/settingsController");
const { ensureAuth } = require("../middleware/auth");

router
  .route("/")
  .get(ensureAuth, settingsController.get)
  .put(ensureAuth, settingsController.update);

module.exports = router;
