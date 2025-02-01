import express from "express";
import { loginUser, registerUser } from "../controllers/auth.js";


const routes = express.Router()


routes.post("/signup" , registerUser)
routes.post("/signin" , loginUser)



export default routes