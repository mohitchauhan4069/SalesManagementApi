var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose
  .connect("mongodb://0.0.0.0:27017/LoansManager")
  .then(() => console.log("DB connected!"))
  .catch((err) => console.log(err));
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var cors = require("cors");
var multer = require("multer");
var upload = multer();

var customersRouter = require("./routes/customers");
var productRouter = require("./routes/products");  
var salesRouter = require("./routes/sales");
var paymentsRouter = require("./routes/payments");
var settingsRouter = require("./routes/settings");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// for parsing application/json
app.use(bodyParser.json());     

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static("public"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/customers", customersRouter);
app.use("/products", productRouter);
app.use("/sales", salesRouter);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
