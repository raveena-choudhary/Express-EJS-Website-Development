//jshint esversion:6
var express = require("express");
var bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Welcome to Manali hotel";

var app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("home", { homeContent: homeStartingContent });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/contact", function (req, res) {
  res.render("contact");
});

app.get("/login", function (req, res) {
  res.render("login", {
    errorMessage: "",
  });
});

app.get("/resetPassword", function (req, res) {
  res.render("resetPwd", {
    errorMessage: "",
  });
});

app.get("/signup", function (req, res) {
  res.render("SignUp", {
    errorMessage: "",
  });
});

app.post("/login", function (req, res) {
  let username = req.body.username;
  let password = req.body.password;
  if (username === "admin" && password === "admin") {
    res.render("home", { homeContent: homeStartingContent });
  } else {
    res.render("login", {
      errorMessage: "Invalid username or password. Please check!",
    });
  }
});

app.post("/signup", function (req, res) {
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;
  let repeatPassword = req.body.repeatPassword;
  if (repeatPassword === password) {
    res.redirect("login");
  } else {
    res.render("SignUp", {
      errorMessage: "Passwords do not match. Please check!",
    });
  }
});

app.post("/resetPassword", function (req, res) {
  let email = req.body.email;
  if (email === "admin@123.com") {
    res.redirect("login");
  } else {
    // console.log("Invalid email address. Please check!");
    res.render("resetPwd", {
      errorMessage: "Invalid email address. Please check!",
    });
  }
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
