import mongoose from "mongoose";
import 'dotenv/config'



export default  function connectDb(){
    mongoose.connect(process.env.MONGODB_URI).then(()=>{
        console.log("Db Connected");
        
    }).catch((err)=>{
        console.log("error",err.message);
        
    })
}

