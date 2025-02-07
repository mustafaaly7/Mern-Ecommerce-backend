import express from "express";
import { authenticateAdmin, authenticateUser } from "../middlewares/authentication.js";
import { getAllorders, orderHistory, placeOrder, updateOrderstatus } from "../controllers/order.js";

const routes = express.Router()

routes.get("/get-all-orders",getAllorders)

routes.get("/order-history",authenticateUser,orderHistory)

routes.post("/place-order" , authenticateUser,placeOrder)


routes.put("/update-status/:id" ,authenticateAdmin,updateOrderstatus)



export default routes
