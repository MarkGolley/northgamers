const express = require("express");
const app = express();
app.use(express.json());

const apiRouter = require("./routers/api.router");
const {
  handlePSQL400Errors,
  handleCustomErrors,
  handle500Errors,
} = require("./errors/errors");

app.use("/api", apiRouter);

app.get("/", (req, res, next) => {
  res.status(200).send({ msg: "Hello from the games api !" });
});

app.use(handlePSQL400Errors);
app.use(handleCustomErrors);
app.use(handle500Errors);

module.exports = app;
