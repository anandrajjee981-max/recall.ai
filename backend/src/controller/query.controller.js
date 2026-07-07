import foldermodel from '../models/folder.model.js';
import saveModel from '../models/save.model.js';
import { queryGraph } from '../service/graph.service.js';

export default async function processQuery(req, res) {
  try {
    const { url: bodyUrl, query } = req.body;
    const url = bodyUrl || query;
    const user = req.user;

    if (!url) {
      return res.status(400).json({
        message: 'URL or query is required',
      });
    }

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

export async function getfolder(req,res){
  try {
    const user = req.user;
    const folders = await foldermodel.find({ username: user._id })
    return res.status(200).json({
      message: "Folders retrieved successfully",
      data: folders,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  } 
}

export async function getsaves(req,res){
try{
const user = req.user;
const id = req.params.id
const saves = await saveModel.find({ username: user._id, folder: id })
return res.status(200).json({
  message: "Saves retrieved successfully",
  data: saves,  
})
}
catch(err){
return res.status(500).json({
  message: "Internal server error",
})
}



}











