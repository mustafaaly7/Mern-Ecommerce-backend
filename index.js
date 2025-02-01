import express from "express";
import morgan from "morgan";
import SendResponse from "./helpers/sendResponse.js";
import connectDb from "./utils/connectDb.js";
import authRoutes from "./routes/auth.js"


const app = express()
app.use(express.json())
connectDb()
app.use(morgan('tiny'))

app.use("/auth" , authRoutes)



app.get("/",(req,res)=>{
SendResponse(res,400,false,null ,"Hello world")
})





app.listen(4000, ()=>{
    console.log("RUNNING ON PORT " );
    
})