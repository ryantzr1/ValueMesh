import mongoDB from "../../../utils/mongoDB";
import Connection from "../../../models/connection";

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
    res.status(200).json({ message: "Connection deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
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
    default:
      res.setHeader("Allow", ["GET", "DELETE", "PUT"]);
      res.status(405).json({ message: `Method ${method} not allowed` });
      break;
  }
}
