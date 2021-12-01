const {
  selectReviewById,
  updateReviewById,
  fetchReviews,
} = require("../models/reviews.model");

const {
  checkIfReview_idExists,
  checkIfReview_idValid,
} = require("../utils/utils");

exports.getReviewById = (req, res, next) => {
  const { review_id } = req.params;
  console.log("in get review by id controller");

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
  console.log("in update review by id controller");

  updateReviewById(review_id, body)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviews = (req, res, next) => {
  console.log("in the reviews by query controller");
  let { sort_by, order_by, category } = req.query;
  console.log(sort_by, order_by, category);
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
      res.status(200).send({ reviews });
    })
    .catch((err) => {
      next(err);
    });
};
