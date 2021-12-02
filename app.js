const { response } = require("express");
const express = require("express");
const app = express();
app.use(express.json());

const apiRouter = require("./routers/api.router");

app.use("/api", apiRouter);

app.get("/", (req, res, next) => {
  res.status(200).send({ msg: "Hello from the games api !" });
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Sorry, id not a valid input!" });
  } else if (err.code === "23503" || err.code === "23502") {
    res.status(400).send({ msg: "Sorry, bad data!" });
  } else {
    res.status(err.status).send({ msg: err.msg });
  }
});

module.exports = app;
