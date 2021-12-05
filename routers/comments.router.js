const express = require("express").Router();
const commentsRouter = express;

const {
  deleteComment,
  patchComment,
} = require("../controllers/comments.controller");

commentsRouter.route("/:comment_id").delete(deleteComment).patch(patchComment);

module.exports = commentsRouter;
