import mongoDB from "../../../utils/mongoDB";
import Connection from "../../../models/connection";
import redis from "../redis";

const getConnection = async (req, res) => {
  try {
    const { id } = req.query;
    const connection = await Connection.findById(id);

    if (!connection) {
      return res.status(404).json({ message: "Connection not found" });
    }

    res.status(200).json(connection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteConnection = async (req, res) => {
  try {
    const { id } = req.query;
    await Connection.findByIdAndDelete(id);
    // Delete the Redis key for this user so it will be refreshed next time
    await redis.del(id);
    res.status(200).json({ message: "Connection deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const addConnection = async (req, res) => {
  try {
    const newPerson = req.body;
    const connection = new Connection(newPerson);
    console.log(connection);
    const result = await connection.save();
    // Delete the Redis key for this user so it will be refreshed next time
    await redis.del(newPerson.userId);
    return res.status(201).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const updateConnection = async (req, res) => {
  try {
    const { id } = req.query;
    const updatedPerson = req.body;

    const updatedConnection = await Connection.findByIdAndUpdate(
      id,
      updatedPerson,
      { new: true }
    );

    if (!updatedConnection) {
      return res.status(404).json({ message: "Connection not found" });
    }

    // Update the Redis cache for this user
    const userId = updatedConnection.userId;
    const cachedConnections = JSON.parse(await redis.get(userId)) || [];
    const updatedConnections = cachedConnections.map((c) =>
      c._id === id ? updatedConnection : c
    );
    await redis.set(userId, JSON.stringify(updatedConnections));

    res.status(200).json({
      message: "Connection updated successfully",
      updatedConnection,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default async function handler(req, res) {
  const { method } = req;

  await mongoDB();

  switch (method) {
    case "GET":
      await getConnection(req, res);
      break;
    case "DELETE":
      await deleteConnection(req, res);
      break;
    case "PUT":
      await updateConnection(req, res);
      break;
    case "POST":
      await addConnection(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "DELETE", "PUT", "POST"]);
      res.status(405).json({ message: `Method ${method} not allowed` });
      break;
  }
}
