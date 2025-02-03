import express from "express";
import { authenticateAdmin } from "../middlewares/authentication.js";
import { addBook, deleteBook, getAllbooks, getRecentbooks, getSinglebook, updateBook } from "../controllers/book.js";

const routes = express.Router()

routes.get("/",getAllbooks)

routes.get("/recent-books",getRecentbooks)

routes.get("/:id",getSinglebook)


routes.post("/add-book",authenticateAdmin, addBook)

routes.put("/update-book" ,authenticateAdmin,updateBook)

routes.delete("/delete-book" , deleteBook)



export default routes