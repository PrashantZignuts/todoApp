const express = require("express");
const app = express();
const todoController = require("./controllers/todoController");

//setting view engine
app.set("view engine", "ejs");

// setting static file
app.use(express.static("./public"));

//loading controllers
todoController(app);

//serving port
app.listen(8080, () => {
  console.log("Serving on Port 8080");
});
