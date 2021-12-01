const express = require("express").Router();
const commentsRouter = express;

const { deleteComment } = require("../controllers/comments.controller");

commentsRouter.route("/:comment_id").delete(deleteComment);

module.exports = commentsRouter;
