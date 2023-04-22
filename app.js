const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

// Load config
dotenv.config({ path: "./config/config.env" });

// express app
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
const dbURI = process.env.dbURI;
console.log(typeof dbURI);
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(port))
  .catch((err) => console.log(err));

// Register view engine
app.set("view engine", "ejs");

// Middleware & Static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  // res.send("<p>About Page</p>");
  res.render("about", { title: "About Us" });
});

// Blog Routes
app.use("/blogs", blogRoutes);

// 404 Page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
