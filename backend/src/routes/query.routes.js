import express from "express";
import verifyme from "../middleware/verifyme.js";
import processQuery from "../controller/query.controller.js";
const queryrouter = express.Router()
queryrouter.post("/submit", verifyme, processQuery);







export default queryrouter 
