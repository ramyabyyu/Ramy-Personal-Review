const Review = require("../models/reviewModel");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const createReview = asyncHandler(async (req, res) => {
  const { good, bad } = req.body;

  if (!good || !bad) {
    res.status(400).json("All fields is required");
  }

  const review = await Review.create({
    good,
    bad,
    user: req.user._id,
    userGender: req.user.gender,
    createdAt: new Date(),
  });

  if (review) {
    res.status(201).json(review);
  } else {
    res.status(400).json("Invalid Input");
  }
});

const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({}, null, {
    sort: { _id: -1 },
  }).exec();

  if (reviews) {
    res.status(200).json(reviews);
  } else {
    res.status(500).json("Server Error");
  }
});

module.exports = {
  createReview,
  getReviews,
};
