const db = require("../connection");

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
      (category_id VARCHAR(15) PRIMARY KEY,
      description VARCHAR(255));`
      );
    })
    .then(() => {
      return db.query(`CREATE TABLE users
    (username VARCHAR(12) PRIMARY KEY,
    avatar_url VARCHAR (155),
    name VARCHAR(20))`);
    })
    .then(() => {
      return db.query(`CREATE TABLE reviews
    (review_id SERIAL PRIMARY KEY,
    title VARCHAR(25),
    review_body VARCHAR(500),
    designer VARCHAR(40),
    review_img_url VARCHAR(250) DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
    votes INT DEFAULT 0,
    category VARCHAR(40) REFERENCES categories(category_id),
    owner VARCHAR(50) REFERENCES users(username),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`);
    })
    .then(() => {
      return db.query(`CREATE TABLE comments
  (comment_id SERIAL PRIMARY KEY,
  author VARCHAR(50) REFERENCES users(username),
  review_id INT REFERENCES reviews(review_id),
  votes INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  body VARCHAR(500))`);
    });

  // 2. insert data
};

module.exports = seed;
