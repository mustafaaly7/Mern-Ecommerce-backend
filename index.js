import express from "express";
import morgan from "morgan";
import SendResponse from "./helpers/sendResponse.js";
import connectDb from "./utils/connectDb.js";
import authRoutes from "./routes/auth.js"
import bookRoutes from './routes/books.js'
import favouriteRoutes from "./routes/favourite.js"
import orderRoutes from "./routes/order.js"
import cartRoutes from "./routes/cart.js"
import cors from "cors";



const app = express()

app.use(express.json())

connectDb()

app.use(cors({
    origin: "*", // Allow frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.options("*", cors()); // Handle preflight requests

app.use(morgan('tiny'))

app.use("/auth" , authRoutes)

app.use("/book",bookRoutes)

app.use("/favourite",favouriteRoutes)

app.use("/order",orderRoutes)

app.use("/cart",cartRoutes)


app.get("/",(req,res)=>{
SendResponse(res,400,false,null ,"Hello world")
})





app.listen(4002, ()=>{
    console.log("RUNNING ON PORT " );
    
})