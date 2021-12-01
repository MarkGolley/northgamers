const { response } = require("express");
const db = require("../db/connection");
const { sort } = require("../db/data/test-data/categories");

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

exports.fetchReviews = (sort_by, order_by, category) => {
  console.log(
    "sort_by:",
    sort_by,
    "order_by:",
    order_by,
    "where category= :",
    category
  );

  let queryStr = `SELECT owner, title, review_id, category, 
  review_img_url, created_at, votes, 
  (SELECT COUNT(*) FROM comments WHERE comments.review_id=reviews.review_id) AS comment_count 
  FROM reviews`;

  if (
    ![
      "strategy",
      "hidden-roles",
      "dexterity",
      "push-your-luck",
      "roll-and-write",
      "deck-building",
      "engine-building",
      "",
    ].includes(category)
  ) {
    Promise.reject({ status: 400, msg: "Invalid category chosen" });
  } else if (category !== "") {
    queryStr += `\nWHERE category = '${category}'`;
  }

  if (
    ![
      "owner",
      "title",
      "review_id",
      "category",
      "review_img_url",
      "designer",
      "created_at",
      "votes",
      "comment_count",
    ].includes(sort_by)
  ) {
    Promise.reject({ status: 400, msg: "Invalid sort_by chosen" });
  }
  if (!["ASC", "DESC"].includes(order_by)) {
    Promise.reject({ status: 400, msg: "Invalid order_by chosen" });
  } else {
    queryStr += `\nORDER BY ${sort_by} ${order_by};`;
  }

  console.log(queryStr);
  return db.query(queryStr).then((response) => {
    return response.rows;
  });
};
