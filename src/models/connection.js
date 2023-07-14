const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConnectionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: false,
  },
  value: {
    type: Number,
    required: true,
  },
  linkedin: {
    type: String,
    required: false,
  },
  metAt: {
    type: String,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
});

const Connection =
  mongoose.models.Connection || mongoose.model("Connection", ConnectionSchema);
export default Connection;
