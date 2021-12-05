const {
  removeCommentById,
  updateComment,
} = require("../models/comments.model");
const {
  checkIfComment_idExists,
  checkIfComment_idValid,
} = require("../utils/utils");

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  Promise.all([
    checkIfComment_idExists(comment_id),
    checkIfComment_idValid(comment_id),
    removeCommentById(comment_id),
  ])
    .then((response) => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchComment = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  Promise.all([
    updateComment(comment_id, inc_votes),
    checkIfComment_idExists(comment_id),
    checkIfComment_idValid(comment_id),
  ])
    .then((comment) => {
      res.status(200).send({ comment: comment[0] });
    })
    .catch((err) => {
      next(err);
    });
};
