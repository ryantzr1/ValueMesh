import mongoose from "mongoose";

//add in mongo connection
const mongoDB = async () =>
  mongoose.connect(
    "mongodb+srv://ryantzr:m8TB0SQg7gKPETOc@cluster0.xjui7vs.mongodb.net/ValueMesh?retryWrites=true&w=majority"
  );

export default mongoDB;
