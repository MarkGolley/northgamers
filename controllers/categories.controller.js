const { selectCategories, addCategory } = require("../models/categories.model");

exports.getCategories = (req, res, next) => {
  selectCategories()
    .then((categories) => {
      res.status(200).send({ categories });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postCategory = (req, res, next) => {
  const { slug, description } = req.body;
  addCategory(slug, description)
    .then((category) => {
      res.status(201).send({ category });
    })
    .catch((err) => {
      next(err);
    });
};
