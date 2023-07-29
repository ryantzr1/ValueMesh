import mongoDB from "../../../utils/mongoDB";
import Connection from "../../../models/connection";

export default async function handler(req, res) {
  await mongoDB();

  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const person = await Connection.findById(id).select("-userId -notes ");
        if (!person) {
          return res
            .status(404)
            .json({ success: false, message: "Connection not found" });
        }
        res.status(200).json({ success: true, data: person });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res
        .status(405)
        .json({ success: false, message: `Method ${method} not allowed` });
      break;
  }
}
