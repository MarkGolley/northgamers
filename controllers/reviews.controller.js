const {
  selectReviewById,
  updateReviewById,
  fetchReviews,
  selectReviewCommentsById,
  newCommentOnReviewById,
  addReview,
} = require("../models/reviews.model");

const {
  checkIfReview_idExists,
  checkIfReview_idValid,
  checkIfUsernameExists,
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
  let { sort_by, order_by, category, limit, p } = req.query;

  if (!sort_by) {
    sort_by = "title";
  }
  if (!order_by) {
    order_by = "ASC";
  }
  if (!category) {
    category = "";
  }
  if (!limit) {
    limit = 10;
  }
  if (!p) {
    p = 0;
  }

  fetchReviews(sort_by, order_by, category, limit, p)
    .then((reviews) => {
      res.status(200).send({ reviews: reviews });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.getReviewComments = (req, res, next) => {
  const { review_id } = req.params;
  let { limit, p } = req.query;
  if (!limit) {
    limit = 10;
  }
  if (!p) {
    p = 0;
  }
  Promise.all([
    selectReviewCommentsById(review_id, limit, p),
    checkIfReview_idExists(review_id),
    checkIfReview_idValid(review_id),
  ])
    .then((comments) => {
      res.status(200).send({ comments: comments[0] });
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

exports.postReview = (req, res, next) => {
  const { owner, title, review_body, designer, category } = req.body;
  Promise.all([
    addReview(owner, title, review_body, designer, category),
    checkIfUsernameExists(owner),
  ])
    .then((review) => {
      res.status(201).send({ review: review[0] });
    })
    .catch((err) => {
      next(err);
    });
};
