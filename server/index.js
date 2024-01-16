const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db");
const Football = require("./models/football");

const catchAsync = require("./middleware/catchAsync");
const verifyId = require("./middleware/verifyId");
const verifyTeam = require("./middleware/verifyTeam");

app.use(cors());
app.use(express.json()); // to parse json
app.use(express.urlencoded({ extended: true })); // to parse URL-encoded data

connectDB(); // database connection

// to get data from the database
app.get(
  "/api/items",
  catchAsync(async (req, res) => {
    const items = await Football.find();
    res.json(items);
  })
);

// FIND (show)
app.get(
  "/api/items/:id",
  verifyId,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const team = await Football.findById(id);

    res.status(200).json(team);
  })
);

// CREATE (add new)
app.post(
  "/api/items",
  verifyTeam,
  catchAsync(async (req, res) => {
    const newTeam = new Football(req.body);
    await newTeam.save();

    res.status(200).json({ message: `${newTeam.name} added.`, newTeam });
  })
);

// UPDATE
app.put(
  "/api/items/:id",
  verifyId,
  verifyTeam,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Football.findByIdAndUpdate(id, {
      ...req.body,
    });

    res
      .status(200)
      .json({ message: "Team successfully edited.", editedTeam: req.body });
  })
);

// DELETE
app.delete(
  "/api/items/:id",
  verifyId,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const deletedTeam = await Football.findByIdAndDelete(id);

    res
      .status(200)
      .json({ message: "Team successfully deleted.", deletedTeam });
  })
);

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
