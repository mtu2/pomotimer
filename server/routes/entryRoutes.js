const router = require("express").Router();
const entryController = require("../controllers/entryController");
const { ensureAuth } = require("../middleware/auth");

router
  .route("/")
  .get(ensureAuth, entryController.findAll)
  .delete(ensureAuth, entryController.deleteAll)
  .post(ensureAuth, entryController.create);

router
  .route("/:entryId")
  .get(ensureAuth, entryController.findById)
  .put(ensureAuth, entryController.update)
  .delete(ensureAuth, entryController.delete);

router.route("/dev").post(entryController.createMultiple);

module.exports = router;
