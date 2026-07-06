import express from "express";
import verifyme from "../middleware/verifyme.js";
import processQuery from "../controller/query.controller.js";
import { getfolder ,getsaves} from "../controller/query.controller.js";

const queryrouter = express.Router()
queryrouter.post("/submit", verifyme, processQuery);
queryrouter.get("/getfolder", verifyme, getfolder);
queryrouter.get("/getsaves/:id", verifyme, getsaves);






export default queryrouter 
