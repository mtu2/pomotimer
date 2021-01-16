const router = require("express").Router();
const authController = require("../controllers/authController");

// @desc    Auth with Google
// @route   GET /auth/google
router.get("/auth/google", authController.googleAuth);

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get("/auth/google/callback", authController.googleAuthCallback);

// @desc    Logout user
// @route   /api/logout
router.get("/api/logout", authController.logout);

// @desc    Current user data
// @route   /api/user
router.get("/api/user", authController.getUser);

// TODO: fix currently mixing /api and /auth routes in this file

module.exports = router;
