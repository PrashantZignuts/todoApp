const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("dotenv").config();

//connect to database
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

//create schema
var todoSchema = new mongoose.Schema({
  item: String,
});

// create model
var Todo = mongoose.model("Todo", todoSchema);

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {
  app.get("/todo", (req, res) => {
    // get data from mongoDB
    Todo.find({}, (err, data) => {
      if (err) throw err;
      res.render("todo", { todos: data });
    });
  });

  app.post("/todo", urlencodedParser, (req, res) => {
    // get data and add new data to database
    var newTodo = Todo(req.body).save((err, data) => {
      if (err) throw err;
      res.json(data);
    });
  });

  app.put("/todo",urlencodedParser, (req, res) => {
    // update data in mongoDB
    console.log(req.body);
    var id = `${req.body.id}`
    console.log(id,"iddddds");
    var item = req.body.item
    Todo.updateOne({_id: req.body.id},{item: req.body.item},(err,data) => {
        if (err) throw err;
        console.log(data,"data updated");
        res.json(data)
    })
  });

  app.delete("/todo/:id", (req, res) => {
    // delete data from mongoDB
    Todo.find({ _id: req.params.id}).remove(
      (err, data) => {
        if (err) throw err;
        res.json(data);
      }
    );
  });
};
