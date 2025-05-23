import express from "express";
import { deleteUser, getAlluser, loginUser, registerUser, userInfo } from "../controllers/auth.js";
import { authenticateAdmin, authenticateUser } from "../middlewares/authentication.js";


const routes = express.Router()

routes.get('/get-all-users',authenticateAdmin , getAlluser)
routes.post("/signup" , registerUser)

routes.post("/signin" , loginUser)

routes.get("/myinfo" ,authenticateUser, userInfo)

routes.delete("/delete-user",authenticateAdmin, deleteUser)

export default routes