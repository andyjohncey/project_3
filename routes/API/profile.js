const router = require("express").Router();
const profileController = require("../../controllers/profileController");

// Match with "/api/profile/login"
router
    .route("/profile")
    .post(profileController.update)
    .create(profileController.create)
    .get(profileController.find);


module.exports = router;
