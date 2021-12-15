exports.handlePSQL400Errors = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Sorry, id not a valid input!" });
  } else if (
    err.code === "23503" ||
    err.code === "23502" ||
    err.code === "42703"
  ) {
    res.status(400).send({ msg: "Sorry, bad input data!" });
  } else {
    next(err);
  }
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.handle500Errors = (err, req, res, next) => {
  res.status(500).send({ msg: "Oh dear! Internal Server Error!" });
};
