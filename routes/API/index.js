const router = require("express").Router();
const authRoutes = require("./auth");
const postRoutes = require("./posts");

// Post routes
router.use("/posts", postRoutes);
router.use("/auth", authRoutes);

module.exports = router;