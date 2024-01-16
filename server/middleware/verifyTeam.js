const Football = require("../models/football");

module.exports = async (req, res, next) => {
  const { name, country } = req.body;
  if (!name && !country)
    return res.status(500).json({ message: "No data was sent." });
  if (!name) {
    return res.status(500).json({ message: "No name was sent." });
  } else if (!country) {
    return res.status(500).json({ message: "No country was sent." });
  }

  const team = await Football.find({ name, country });
  if (team.length > 0)
    return res.status(500).json({ message: "Team already exists", team });

  next();
};
