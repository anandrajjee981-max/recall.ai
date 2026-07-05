import mongoose from "mongoose";

const folderSchema = new mongoose.Schema({
    username:{
        type :mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true  
    },
name: {
    type: String,
    required: true
},
url:{
    type: String,
    required: true  
},
description:{
    type: String,
    required: true 
},




})


const foldermodel = mongoose.model("Folder", folderSchema);

export default foldermodel;








