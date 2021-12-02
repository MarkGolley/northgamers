const apiRouter = require("express").Router();

const commentsRouter = require("./comments.router");
const reviewsRouter = require("./reviews.router");
const categoriesRouter = require("./categories.router");
const { getAPIs } = require("../controllers/api.controller");

apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.route("/").get(getAPIs);

module.exports = apiRouter;
