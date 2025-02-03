import express from "express";
import { authenticateAdmin, authenticateUser } from "../middlewares/authentication.js";
import { addTofav, getFav, removeFav } from "../controllers/favourite.js";

const routes = express.Router()

routes.put("/addtofavourite",authenticateUser,addTofav)

routes.put("/remove-book" ,authenticateUser, removeFav)
routes.get("/get-fav-books" , authenticateUser,getFav)




export default routes