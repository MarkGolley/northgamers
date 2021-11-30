const express = require("express").Router();
const categoriesRouter = express;

const { getCategories } = require("../controllers/categories.controller");

categoriesRouter.route("/").get(getCategories);

module.exports = categoriesRouter;
