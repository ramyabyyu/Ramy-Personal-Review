const Review = require("../models/reviewModel");
const asyncHandler = require("express-async-handler");

const createReview = asyncHandler(async (req, res) => {
  const { good, bad } = req.body;

  if (!good || !bad) {
    res.status(400);
    throw new Error("All Fields is Required");
  }

  const review = await Review.create({
    good,
    bad,
    user: req.user._id,
  });

  if (review) {
    res.status(201).json(review);
  } else {
    res.status(400).json({
      message: "Invalid Input",
    });
  }
});

module.exports = {
  createReview,
};
