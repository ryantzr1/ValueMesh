import mongoDB from "../../utils/mongoDB";
import Connection from "../../models/connection";
import cors from "cors";

const getConnections = async (req, res) => {
  try {
    await mongoDB();

    const userId = req.query.userId; // Get the userId from the query parameters

    const people = await Connection.find({ userId: userId }).exec(); // Find connections for the specific user
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
