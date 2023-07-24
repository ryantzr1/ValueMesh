import mongoDB from "../../utils/mongoDB";
import Connection from "../../models/connection";
import redis from "./redis";

const getConnections = async (req, res) => {
  try {
    mongoDB();

    const userId = req.query.userId;
    // Check if data is in Redis
    const cacheData = await redis.get(userId);
    if (cacheData) {
      // Return cached data if it exists
      return res.status(200).json(JSON.parse(cacheData));
    } else {
      // If not in cache, fetch from MongoDB
      const people = await Connection.find({ userId: userId });
      // Save to Redis for next time
      await redis.set(userId, JSON.stringify(people));
      return res.status(200).json(people);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const addConnection = async (req, res) => {
  try {
    const newPerson = req.body;
    const connection = new Connection(newPerson);
    const result = await connection.save();
    // Delete the Redis key for this user so it will be refreshed next time
    await redis.del(newPerson.userId);
    return res.status(201).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const deleteConnection = async (req, res) => {
  try {
    const { id } = req.body;
    // Find the connection by ID
    const connection = await Connection.findById(id);
    if (!connection) {
      return res.status(404).json({ message: "Connection not found" });
    }
    // Delete the connection from MongoDB
    await connection.deleteOne();
    // Delete the connection from Redis cache
    const userId = connection.userId;
    const cachedConnections = JSON.parse(await redis.get(userId)) || [];
    const updatedConnections = cachedConnections.filter((c) => c._id !== id);
    await redis.set(userId, JSON.stringify(updatedConnections));
    return res.status(200).json({ message: "Connection deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
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
