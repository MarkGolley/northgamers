const express = require("express");
const app = express();
app.use(express.json());

const apiRouter = require("./routers/api.router");

app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  console.log("err", err);
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Sorry, review_id not a valid input!" });
  } else if (err.code === "23503") {
    res.status(400).send({ msg: "Sorry, username does not exist!" });
  } else if (err.code === "23502") {
    res.status(400).send({ msg: "Sorry, bad data entry!" });
  } else {
    res.status(err.status).send({ msg: err.msg });
  }
});

module.exports = app;
