const db = require("../connection");
const format = require("pg-format");
const { response } = require("express");

const seed = (data) => {
  const { categoryData, commentData, reviewData, userData } = data;
  return db
    .query(`DROP TABLE IF EXISTS comments;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS reviews;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS categories;`);
    })
    .then(() => {
      return db.query(
        `CREATE TABLE categories
      (category_id VARCHAR(25) PRIMARY KEY,
      description VARCHAR(255) NOT NULL);`
      );
    })
    .then(() => {
      return db.query(`CREATE TABLE users
    (username VARCHAR(20) PRIMARY KEY,
    avatar_url VARCHAR(155) NOT NULL,
    name VARCHAR(20) NOT NULL)`);
    })
    .then(() => {
      return db.query(`CREATE TABLE reviews
    (review_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    review_body VARCHAR(1000) NOT NULL,
    designer VARCHAR(40) NOT NULL,
    review_img_url VARCHAR(250) DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg' NOT NULL,
    votes INT DEFAULT 0 NOT NULL,
    category VARCHAR(40) REFERENCES categories(category_id) NOT NULL,
    owner VARCHAR(50) REFERENCES users(username) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL);`);
    })
    .then(() => {
      return db.query(`CREATE TABLE comments
    (comment_id SERIAL PRIMARY KEY,
    author VARCHAR(50) REFERENCES users(username) NOT NULL,
    review_id INT REFERENCES reviews(review_id) NOT NULL,
    votes INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    body VARCHAR(500) NOT NULL)`);
    })
    .then(() => {
      const queryStr = format(
        `INSERT INTO categories
      (category_id,description)
      VALUES
      %L
      RETURNING *;`,
        categoryData.map((item) => [item.slug, item.description])
      );
      return db.query(queryStr);
    })
    .then(() => {
      const queryStr = format(
        `INSERT INTO users
      (username,name, avatar_url)
      VALUES
      %L
      RETURNING *;`,
        userData.map((item) => [item.username, item.name, item.avatar_url])
      );
      return db.query(queryStr);
    })
    .then(() => {
      const queryStr = format(
        `INSERT INTO reviews
      (title, designer, owner, review_img_url, review_body,category, created_at,votes)
      VALUES
      %L
      RETURNING *;`,
        reviewData.map((item) => [
          item.title,
          item.designer,
          item.owner,
          item.review_img_url,
          item.review_body,
          item.category,
          item.created_at,
          item.votes,
        ])
      );
      return db.query(queryStr);
    })
    .then(() => {
      const queryStr = format(
        `INSERT INTO comments
      (body, votes, author, review_id, created_at)
      VALUES
      %L
      RETURNING *;`,
        commentData.map((item) => [
          item.body,
          item.votes,
          item.author,
          item.review_id,
          item.created_at,
        ])
      );
      return db.query(queryStr);
    });
};

module.exports = seed;
