const db = require("../db/connection");

exports.selectReviewById = (review_id) => {
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

exports.fetchReviews = (sort_by, order_by, category, limit, p) => {
  let queryStr = `SELECT owner, title, reviews.review_id, category, 
  review_img_url, reviews.created_at, reviews.votes,
  (SELECT COUNT(*) FROM reviews)-(${limit}) AS total_count,
  (SELECT COUNT(*) FROM comments WHERE comments.review_id=reviews.review_id) AS comment_count
  FROM reviews
  LEFT JOIN comments ON comments.review_id = reviews.review_id`;

  if (
    ![
      "strategy",
      "hidden-roles",
      "dexterity",
      "push-your-luck",
      "roll-and-write",
      "deck-building",
      "engine-building",
      "social deduction",
      "euro game",
      "children''s games",
      "",
    ].includes(category)
  ) {
    return Promise.reject({ status: 400, msg: "Invalid category chosen" });
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
    return Promise.reject({ status: 400, msg: "Invalid sort_by chosen" });
  }
  if (!["ASC", "DESC"].includes(order_by)) {
    return Promise.reject({ status: 400, msg: "Invalid order_by chosen" });
  } else {
    queryStr += `\nORDER BY ${sort_by} ${order_by}`;
  }
  queryStr += `\nLIMIT ${limit} OFFSET ${p * limit};`;

  return db.query(queryStr).then((response) => {
    return response.rows;
  });
};

exports.selectReviewCommentsById = (review_id, limit, p) => {
  let queryStr = `SELECT comment_id, votes, created_at, author, body,
  (SELECT COUNT(*) FROM comments)-(${limit}) AS total_count
  FROM comments
  WHERE review_id = ${review_id}
  LIMIT ${limit} OFFSET ${p * limit};`;

  return db.query(queryStr).then((response) => {
    return response.rows;
  });
};

exports.newCommentOnReviewById = (review_id, body, username) => {
  return db
    .query(
      `INSERT INTO comments (author, body, review_id)
  VALUES ($1,$2,$3)
  RETURNING *;
  `,
      [username, body, parseInt(review_id)]
    )
    .then((response) => {
      return response.rows;
    });
};

exports.addReview = (owner, title, review_body, designer, category) => {
  return db
    .query(
      `INSERT INTO reviews (owner, title, review_body, designer, category)
  VALUES ($1,$2,$3,$4,$5)
  RETURNING *,(SELECT COUNT(*) FROM comments WHERE comments.review_id=reviews.review_id) AS comment_count;`,
      [owner, title, review_body, designer, category]
    )
    .then((response) => {
      return response.rows;
    });
};

exports.removeReviewById = (review_id) => {
  return db
    .query(
      `DELETE FROM reviews
  WHERE review_id = $1
  RETURNING *;`,
      [review_id]
    )
    .then((response) => {
      return response.rows;
    });
};
