const { selectCategories } = require("../models/categories.model");

exports.getCategories = (req, res, next) => {
  console.log("In controller");
  selectCategories()
    .then((categories) => {
      res.status(200).send({ categories });
    })
    .catch((err) => {
      next(err);
    });
};
