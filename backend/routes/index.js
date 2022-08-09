const router = require("express").Router();

// Controllers
const { register, login } = require("../controllers/userController");
const { createReview, getReviews } = require("../controllers/reviewController");

// Middlewares
const { protect } = require("../middlewares/authMiddleware");

// Auth Routes
router.post("/register", register);
router.post("/login", login);

// Review Routes
router.route("/review").post(protect, createReview).get(getReviews);

module.exports = router;
