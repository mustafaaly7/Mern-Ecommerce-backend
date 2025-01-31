import express from "express";
import morgan from "morgan";
import SendResponse from "./helpers/sendResponse.js";
import connectDb from "./utils/connectDb.js";

const app = express()

connectDb()
app.use(express.json())
app.use(morgan('tiny'))

app.get("/",(req,res)=>{
SendResponse(res,400,false,null ,"Hello world")
})





app.listen(4000, ()=>{
    console.log("RUNNING ON PORT " );
    
})