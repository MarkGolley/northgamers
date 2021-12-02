const { response } = require("express");
const db = require("../db/connection");

exports.selectUsers = () => {
  console.log("in get users model");
  return db.query(`SELECT * FROM users;`).then((response) => {
    return response.rows;
  });
};
