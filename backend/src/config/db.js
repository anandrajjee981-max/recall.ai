import mongoose from "mongoose";

export default async function connectdb(){
await mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("connect db")
})


}








