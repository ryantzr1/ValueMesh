import mongoDB from "../../utils/mongoDB";
import Connection from "../../models/connection";
import mongoose from "mongoose"; // Ensure to import mongoose

// import cors from "cors";

const getConnections = async (req, res) => {
  try {
    mongoDB()
      .then(() => {
        const connectionState = mongoose.connection.readyState;
        console.log("Connection state:", connectionState); // Log the connection state
      })
      .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
      });

    const userId = req.query.userId; // Get the userId from the query parameters
    console.log(userId + " This is userID ");
    const people = await Connection.find({ userId: userId }).exec(); // Find connections for the specific user
    console.log(people);
    res.status(200).json(people);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const addConnection = async (req, res) => {
  try {
    const newPerson = req.body;
    console.log(newPerson);
    const connection = new Connection(newPerson);
    const result = await connection.save();
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteConnection = async (req, res) => {
  try {
    const { id } = req.body;
    await Connection.findByIdAndDelete(id);
    res.status(200).json({ message: "Connection deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    await getConnections(req, res);
  } else if (req.method === "POST") {
    await addConnection(req, res);
  } else if (req.method === "DELETE") {
    await deleteConnection(req, res);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
