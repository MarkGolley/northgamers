const apiRouter = require("express").Router();

const commentsRouter = require("./comments.router");
const reviewsRouter = require("./reviews.router");
const categoriesRouter = require("./categories.router");
const usersRouter = require("../routers/users.router");
const { getAPIs } = require("../controllers/api.controller");

apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.route("/").get(getAPIs);

module.exports = apiRouter;
