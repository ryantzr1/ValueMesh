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
  tags: {
    type: Array,
    required: false,
  },
});

// Creating an index on the 'userId' field
// ConnectionSchema.index({ userId: 1 });

//Remember, while indexes can speed up read operations, they can also slow down write operations because every time a document is inserted or updated, the index also needs to be updated. Therefore, you should only create indexes on fields that you query frequently.

const Connection =
  mongoose.models.Connection || mongoose.model("Connection", ConnectionSchema);
export default Connection;
