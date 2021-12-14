const express = require("express").Router();
const categoriesRouter = express;

const {
  getCategories,
  postCategory,
} = require("../controllers/categories.controller");

categoriesRouter.route("/").get(getCategories).post(postCategory);

module.exports = categoriesRouter;
