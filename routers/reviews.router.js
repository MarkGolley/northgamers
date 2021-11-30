const express = require("express").Router();

const reviewsRouter = express;

const {
  getReviewById,
  patchReviewById,
} = require("../controllers/reviews.controller");

reviewsRouter.route("/:review_id").get(getReviewById).patch(patchReviewById);

module.exports = reviewsRouter;
