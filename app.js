const express = require("express");
const app = express();
const todoController = require("./controllers/todoController");
const mongoose = require("mongoose");
require("dotenv").config();

//connect to database
  mongoose 
 .connect(process.env.MONGODB_URL)   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));


//create schema
var todoSchema = new mongoose.Schema({
  item: String,
});

// create model
var Todo = mongoose.model("Todo", todoSchema);

//create a fake datas
var itemOne = Todo({item: 'buy flowers'}).save((err) => {
    if(err) throw err
    console.log("Data is saved");
})

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
