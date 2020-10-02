const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const date = require(__dirname + "/date.js");

let items = [];
let workItems = [];

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  var day = date.getDate();
  res.render("list", {
    listTitle: day,
    newItems: items
  })
})
app.post("/", function(req, res) {
  var item = req.body.toDoItem;
  if(req.body.button === "Work Stuff") {
    workItems.push(item);
    res.redirect("/work");
  } else {
      items.push(item);
      res.redirect("/");
    }
})

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work Stuff",
    newItems: workItems
  })
})

app.post("/work", function(req, res) {
  let item = req.body.toDoItem;
  workItems.push(item);
  res.redirect("/work");

})

app.get("/about", function(req, res) {
  res.render("about");
})

app.post("/about", function(req, res) {
  res.redirect("/about")
})

app.listen(process.env.PORT || 3000, function() {
  console.log("server is running for ToDo App");
})
