const { fetchAPIs } = require("../models/api.model");

exports.getAPIs = (req, res, next) => {
  console.log("in api controller");
  fetchAPIs()
    .then((endpoints) => {
      res.status(200).send({ endpoints });
    })
    .catch((err) => {
      next(err);
    });
};
