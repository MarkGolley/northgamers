const db = require("../db/connection");

exports.selectCategories = (limit) => {
  let queryStr = `SELECT * FROM categories`;
  queryStr += `\nLIMIT ${limit};`;

  return db.query(queryStr).then((response) => {
    return response.rows;
  });
};
exports.addCategory = (slug, description) => {
  return db
    .query(
      `INSERT INTO categories (slug, description)
  VALUES ($1,$2)
  RETURNING *;`,
      [slug, description]
    )
    .then((response) => {
      return response.rows;
    });
};
