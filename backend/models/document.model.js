const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  data: {
    type: Object,
  },
  title: {
    type: String,
    default: "Untitled Document",
  },
});

const Document = mongoose.model("Document", documentSchema);
module.exports = Document;
