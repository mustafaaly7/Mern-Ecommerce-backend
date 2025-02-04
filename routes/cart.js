import express from "express";
import { authenticateUser } from "../middlewares/authentication.js";
import { addTocart, getUsercart, removefromCart } from "../controllers/cart.js";

const routes = express.Router()

routes.put("/add-to-cart" , authenticateUser,addTocart)

routes.put("/remove-from-cart/:bookid" , authenticateUser,removefromCart)

routes.get("/get-user-cart" , authenticateUser , getUsercart)


export default routes
