//jshint esversion:6

const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require('lodash');
require("dotenv").config();

const homeStartingContent = "Welcome to my Blog Website. Compose a blog if you like by adding /compose in the URL. You can also check out these blogs. Click on read more on any of the blogs which will redirect you to the entire blog. Click on contact for any queries and on about us to know more about this website. Enjoy your time on the site.";

const aboutContent = "This site is made by Tanishk Thilakan as a side project to further his knowledge in Node.JS, Express.JS, MongoDB and EJS. The site is hosted on heroku and the database is connected via mongodb atlas. You can see the entire code on github profile named tanishk26";

const contactContent = "Currently pursuing an undergrad degree in Computer and Communication Engineering at Manipal Institute of Technology. Prolific in C++ and acquiring more knowledge in MERN stack with each passing day. Contact me through mail which I have posted on my github profile named tanishk26";

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function (req, res) {

  Post.find({}, function (err, posts) {
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
    });
  });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function (err) {
    if (!err) {
      res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function (req, res) {

  const requestedPostId = req.params.postId;

  Post.findOne({ _id: requestedPostId }, function (err, post) {
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

let port = process.env.PORT;
if (port == NULL || port == "") {
  port = 3000;
}
app.listen(port, function () {
  console.log("Server started successfully");
});
