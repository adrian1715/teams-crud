const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

// to parse json and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/teams")
  .then(() => console.log("database connected!"))
  .catch((err) => console.log("database connection failed", err));

const Football = require("./models/football");

// to catch errors
function catchAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
}

// to get data from the database
app.get(
  "/api/items",
  catchAsync(async (req, res) => {
    const items = await Football.find();
    res.json(items);
  })
);

// CREATE (add new)
app.post("/api/items", async (req, res) => {
  const newTeam = new Football(req.body);
  // using try and catch just to specify user redirect in case of error
  try {
    // adding new team to the database
    await newTeam.save();
    res.redirect("http://localhost:3000");
  } catch (err) {
    // showing error message (configure UI message in React)
    console.log("sending error", err);
    res.redirect("http://localhost:3000/new");
  }
});

// FIND (show)
app.get(
  "/api/items/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const team = await Football.findById(id);
    res.json(team);
  })
);

// UPDATE
app.put("/api/items/:id", async (req, res) => {
  const { id } = req.params;
  await Football.findByIdAndUpdate(id, {
    ...req.body,
  });
});

// DELETE
app.delete("/api/items/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Football.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
});

// default error handling middleware (it'll be triggered when catchAsync catches an error and executes next())
app.use((err, req, res, next) => {
  const { status = 500, message = "Unexpected error" } = err;
  console.log("ERROR: ", message);
  console.log("FULL ERROR: ", err);
  res.status(status).send(message); // shows the error message in the page
});

app.listen(3001, () => {
  console.log("connection open on port 3001");
});
