const apiRouter = require("express").Router();

const commentsRouter = require("./comments.router");
const reviewsRouter = require("./reviews.router");
const categoriesRouter = require("./categories.router");

apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;
