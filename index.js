import express from "express";
import morgan from "morgan";

const app = express()


app.use(express.json())
app.use(morgan('tiny'))

app.get("/",(req,res)=>{
res.send("HELLO WORLD")

})





app.listen(4000, ()=>{
    console.log("RUNNING ON PORT " );
    
})