const mongoose = require("mongoose");

const footballSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const Football = mongoose.model("Football", footballSchema);

module.exports = Football;
