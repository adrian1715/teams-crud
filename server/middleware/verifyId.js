module.exports = (req, res, next) => {
  const { id } = req.params;
  if (id && !id.match(/^[0-9a-fA-F]{24}$/))
    return res.status(404).json({ message: "Team not found." });

  next();
};
