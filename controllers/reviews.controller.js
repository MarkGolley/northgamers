const { response, urlencoded } = require("express");
const {
  selectReviewById,
  updateReviewById,
  fetchReviews,
  selectReviewCommentsById,
  newCommentOnReviewById,
} = require("../models/reviews.model");

const {
  checkIfReview_idExists,
  checkIfReview_idValid,
} = require("../utils/utils");

exports.getReviewById = (req, res, next) => {
  const { review_id } = req.params;

  selectReviewById(review_id)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchReviewById = (req, res, next) => {
  const { review_id } = req.params;
  const body = req.body.inc_votes;

  updateReviewById(review_id, body)
    .then((review) => {
      res.status(200).send({ review: review });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviews = (req, res, next) => {
  let { sort_by, order_by, category } = req.query;

  if (sort_by === undefined) {
    sort_by = "title";
  }
  if (order_by === undefined) {
    order_by = "ASC";
  }
  if (category === undefined) {
    category = "";
  }
  fetchReviews(sort_by, order_by, category)
    .then((reviews) => {
      res.status(200).send({ reviews: reviews });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviewComments = (req, res, next) => {
  const { review_id } = req.params;
  Promise.all([
    checkIfReview_idExists(review_id),
    selectReviewCommentsById(review_id),
  ])
    .then((comments) => {
      res.status(200).send({ comments: comments[1] });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postCommentOnReviewById = (req, res, next) => {
  const { review_id } = req.params;
  const { body, username } = req.body;
  newCommentOnReviewById(review_id, body, username)
    .then((comment) => {
      res.status(200).send({ comment: comment });
    })
    .catch((err) => {
      next(err);
    });
};
