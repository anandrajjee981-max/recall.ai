import foldermodel from '../models/folder.model.js';
import { queryGraph } from '../service/graph.service.js';

export default async function processQuery(req, res) {
  try {
    const { url } = req.body;
    const user = req.user;

    const result = await queryGraph.invoke({
      url,
      userId: user._id,
    });

    return res.status(200).json({
      message: "Query processed successfully",
      data: result,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}













