const db = require("../db/connection");

exports.selectUsers = (limit) => {
  let queryStr = `SELECT * FROM users`;
  queryStr += `\nLIMIT ${limit};`;

  return db.query(queryStr).then((response) => {
    return response.rows;
  });
};

exports.selectUserById = (username) => {
  return db
    .query(`SELECT * FROM users WHERE username = $1;`, [username])
    .then((response) => {
      return response.rows;
    });
};
