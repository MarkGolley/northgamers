const express = require("express");
const app = express();
const listEndpoints = require("express-list-endpoints");
app.use(express.json());

const apiRouter = require("./routers/api.router");

app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  console.log("err", err);
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Sorry, id not a valid input!" });
  } else if (err.code === "23503" || err.code === "23502") {
    res.status(400).send({ msg: "Sorry, bad data!" });
  } else {
    res.status(err.status).send({ msg: err.msg });
  }
});

let endpoints = listEndpoints(app);

module.exports = { app, endpoints };
