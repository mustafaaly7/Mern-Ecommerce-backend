import express from "express";
import { authenticateAdmin } from "../middlewares/authentication.js";
import { addBook } from "../controllers/book.js";

const routes = express.Router()


routes.post("/add-book",authenticateAdmin, addBook)




export default routes