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


export const updateBook =async(req,res) =>{
try {
  const {bookid} = req.headers
  console.log("BOOKID" , req.headers.bookid);
  
  const findBook = await bookModel.findByIdAndUpdate(bookid,req.body,{new:true , runValidators:true}) // new true would return the updated object and runvalidator will follow the book model requirements
if(!findBook) return SendResponse(res, 404, true, null, "Book not found")

  SendResponse(res,200 ,false ,findBook , "book updated successfully")


} catch (error) {
                SendResponse(res, 400, true, null, error.message)
  
}


}


export const deleteBook =async(req,res) =>{
  try {
    const {bookid} = req.headers
    
    const findBook = await bookModel.findByIdAndDelete(bookid)
  if(!findBook) return SendResponse(res, 404, true, null, "Book not found")
  
    SendResponse(res,200 ,false ,null , "book deleted successfully")
  
  
  } catch (error) {
                  SendResponse(res, 400, true, null, error.message)
    
  }
  
  
  }

export const getAllbooks =async(req,res)=>{


try {
const allBooks = await bookModel.find().sort({createdAt : -1})
SendResponse(res,200 , false ,allBooks,"data fetched successfully")
  




} catch (error) {
  
  SendResponse(res, 400, true, null, error.message)

}



}

