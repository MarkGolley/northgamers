const reviewsRouter = require("../routers/reviews.router");

const endpoints = require("../endpoints.json");

exports.fetchAPIs = () => {
  return Promise.resolve(endpoints);
};
