import express from "express";
import { registerUser } from "../controllers/auth.js";


const routes = express.Router()


routes.post("/signup" , registerUser)




export default routes