var createError = require("http-errors");
var express = require("express");
let todosRouter = require("./api/TodoRoute");

require("dotenv").config();
var logger = require("morgan");
let cors = require("cors");
let helmet = require("helmet");
var app = express();

app.use(cors());
app.use(helmet());

app.use(logger("dev"));
app.use(express.json());

app.use("/api/todos", todosRouter);
app.get("/", function (req, res) {
    res.status(200).send("API is up");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
