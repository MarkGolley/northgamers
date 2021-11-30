const db = require("../db/connection");

exports.selectCategories = () => {
  console.log("in model");
  return db.query(`SELECT * FROM categories`).then((response) => {
    return response.rows;
  });
};
