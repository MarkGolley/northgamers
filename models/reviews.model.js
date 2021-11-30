const db = require("../db/connection");

exports.selectReviewById = (review_id) => {
  console.log("in model by id, for ID:", review_id);
  return db
    .query(
      `SELECT 
      reviews.*, 
      (SELECT COUNT(*) FROM comments WHERE comments.review_id=reviews.review_id) AS comment_count 
      FROM reviews
      WHERE reviews.review_id = $1
      ORDER BY reviews.review_id
    ;`,
      [review_id]
    )
    .then((response) => {
      if (response.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Sorry, review_id not found!",
        });
      }
      return response.rows[0];
    });
};

exports.updateReviewById = (review_id, body) => {
  console.log(`in model for update review by ID:${review_id} with ${body}`);
  return db
    .query(
      `UPDATE reviews
      SET votes = (votes+$1)
      WHERE review_id = $2
      RETURNING *;`,
      [body, review_id]
    )
    .then((response) => {
      return response.rows[0];
    });
};
