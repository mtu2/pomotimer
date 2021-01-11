const router = require("express").Router();
const entryController = require("../controllers/entryController");

router
  .route("/")
  .get(entryController.findAll)
  .delete(entryController.deleteAll)
  .post(entryController.create);

router
  .route("/:id")
  .get(entryController.findById)
  .put(entryController.update)
  .delete(entryController.delete);

router.route("/dev").post(entryController.createMultiple);

module.exports = router;
