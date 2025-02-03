import express from "express";
import { authenticateAdmin } from "../middlewares/authentication.js";
import { addBook, deleteBook, getAllbooks, updateBook } from "../controllers/book.js";

const routes = express.Router()

routes.get("/",getAllbooks)

routes.post("/add-book",authenticateAdmin, addBook)

routes.put("/update-book" ,authenticateAdmin,updateBook)

routes.delete("/delete-book" , deleteBook)



export default routes