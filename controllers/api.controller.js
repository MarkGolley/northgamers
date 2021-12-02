const { fetchAPIs } = require("../models/api.model");

exports.getAPIs = (req, res, next) => {
  console.log("in api controller");
  fetchAPIs()
    .then((apis) => {
      console.log("apis object is", { apis });
      res.status(200).send({ apis });
    })
    .catch((err) => {
      next(err);
    });
};
