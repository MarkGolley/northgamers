const express = require("express").Router();

const reviewsRouter = express;

const {
  getReviewById,
  patchReviewById,
  getReviews,
  getReviewComments,
  postCommentOnReviewById,
  postReview,
} = require("../controllers/reviews.controller");

reviewsRouter.route("/:review_id").get(getReviewById).patch(patchReviewById);
reviewsRouter.route("/").get(getReviews).post(postReview);
reviewsRouter
  .route("/:review_id/comments")
  .get(getReviewComments)
  .post(postCommentOnReviewById);

module.exports = reviewsRouter;
