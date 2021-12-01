const express = require("express").Router();

const reviewsRouter = express;

const {
  getReviewById,
  patchReviewById,
  getReviews,
} = require("../controllers/reviews.controller");

reviewsRouter.route("/:review_id").get(getReviewById).patch(patchReviewById);
reviewsRouter.route("/").get(getReviews);

module.exports = reviewsRouter;
