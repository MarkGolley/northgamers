const express = require("express").Router();

const reviewsRouter = express;

const {
  getReviewById,
  patchReviewById,
  getReviews,
  getReviewComments,
} = require("../controllers/reviews.controller");

reviewsRouter.route("/:review_id").get(getReviewById).patch(patchReviewById);
reviewsRouter.route("/").get(getReviews);
reviewsRouter.route("/:review_id/comments").get(getReviewComments);

module.exports = reviewsRouter;
