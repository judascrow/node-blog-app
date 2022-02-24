const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");

const newPostController = require("./controllers/newPost");
const homeController = require("./controllers/home");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");
const validateMiddleWare = require("./middleware/validateMiddleWare");

mongoose.connect(
  "mongodb+srv://judasdev:judasdev2533@cluster0.b4it7.mongodb.net/node-blog-db?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

const app = new express();

app.use("/posts/store", validateMiddleWare);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", homeController);
app.get("/post/:id", getPostController);
app.get("/posts/new", newPostController);
app.post("/posts/store", storePostController);

app.listen(4000, () => {
  console.log("App listening on port 4000");
});
