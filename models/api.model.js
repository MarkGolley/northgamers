const reviewsRouter = require("../routers/reviews.router");

const endpoints = require("../endpoints.json");

exports.fetchAPIs = () => {
  console.log("in api model");
  return Promise.resolve(endpoints);
};
