import SendResponse from "../helpers/sendResponse.js";
import bookModel from "../models/booksmodel.js";
import { bookSchema } from "../models/validation schemas/bookschema.js";


export const addBook =async(req,res)=>{
    try {
        
  
    const { error, value } = bookSchema.validate(req.body);
if (error) {
  return res.status(400).json({ success: false, message: error.details[0].message });
}

let book = new bookModel(value)
book = await book.save()

SendResponse(res, 200, false, book, "Book Added Successfully")


} catch (error) {
                SendResponse(res, 400, true, null, error.message)
        
}
}
