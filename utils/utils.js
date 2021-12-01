const db = require("../db/connection");

exports.checkIfReview_idExists = (review_id) => {
  return db
    .query(
      `SELECT *
    FROM reviews
    WHERE review_id = $1`,
      [review_id]
    )
    .then((body) => {
      if (body.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Sorry, review_id not found",
        });
      } else {
        return body.rows;
      }
    });
};

exports.checkIfReview_idValid = (review_id) => {
  console.log(typeof parseInt(review_id));
  if (typeof parseInt(review_id) !== "number") {
    return Promise.reject({
      status: 400,
      msg: "Sorry, review_id not a valid input!",
    });
  } else {
    return { review_id: review_id };
  }
};