const db = require("../db/connection");

exports.selectCategories = () => {
  return db.query(`SELECT * FROM categories;`).then((response) => {
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
