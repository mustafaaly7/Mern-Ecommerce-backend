import express from "express";
import { loginUser, registerUser, userInfo } from "../controllers/auth.js";
import { authenticateUser } from "../middlewares/authentication.js";


const routes = express.Router()


routes.post("/signup" , registerUser)
routes.post("/signin" , loginUser)

routes.get("/myinfo" ,authenticateUser, userInfo)

export default routes