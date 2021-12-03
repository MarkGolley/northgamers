const { selectUsers, selectUserById } = require("../models/users.model");

const {
  checkIfUsernameExists,
  checkIfUsernameValid,
} = require("../utils/utils");

exports.getUsers = (req, res, next) => {
  selectUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUserById = (req, res, next) => {
  const { username } = req.params;
  Promise.all([
    selectUserById(username),
    checkIfUsernameExists(username),
    checkIfUsernameValid(username),
  ])
    .then((user) => {
      res.status(200).send({ user: user[0] });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
