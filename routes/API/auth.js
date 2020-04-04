const router = require("express").Router();
const authController = require("../../controllers/authController");

// Match with "/api/auth/login"
router
    .route("/login")
    .post(authController.login);

// Match with "/api/auth/signup"
router
    .route("/signup")
    .post(authController.signup);

module.exports = router;
