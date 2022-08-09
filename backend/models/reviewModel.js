const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  good: {
    type: [String],
    required: true,
  },
  bad: {
    type: [String],
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  createdAt: Date,
  userGender: String,
});

const Review = mongoose.model("reviews", reviewSchema);

module.exports = Review;
