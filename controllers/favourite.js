import SendResponse from "../helpers/sendResponse.js"
import userModel from "../models/usermodel.js"


export const addTofav = async (req, res) => {
    try {
        const { bookid } = req.headers

        const user = await userModel.findById(req.user._id)

        const isBookadded = user.favourites.includes(bookid)
        if (isBookadded) return SendResponse(res, 400, true, null, "BOOK Already favourite")

            const findUser = await userModel.findByIdAndUpdate(
                req.user._id, 
                { $push: { favourites: bookid } },  // <-- Correct $push syntax
                { new: true, runValidators: true } // <-- Ensures updated document is returned
              );

console.log("find user" , findUser);


SendResponse(res,200,false,findUser , "book Added to favourites")

    } catch (error) {
        SendResponse(res, 400, true, null, error.message)

    }





}

export const removeFav = async (req, res) => {
    try {
        const { bookid } = req.headers

        const user = await userModel.findById(req.user._id)

        const isBookadded = user.favourites.includes(bookid)
        if (isBookadded) {
        
            const findUser = await userModel.findByIdAndUpdate(
                req.user._id, 
                { $pull: { favourites: bookid } },  // <-- Correct $push syntax
                { new: true, runValidators: true } // <-- Ensures updated document is returned
              );
              SendResponse(res,200,false,findUser , "book Removed from favourite")
        }else{
            SendResponse(res,400,false,null  , "book is not added to favourite")

        }





    } catch (error) {
        SendResponse(res, 400, true, null, error.message)

    }





}

export const getFav =async(req,res)=>{
try {

const findUser = await userModel.findById(req.user._id).populate("favourites")
const favBooks = findUser.favourites;

if(favBooks.length == 0) return SendResponse(res, 400, true, null, "You dont have any favourite books") 

SendResponse(res,200,false,favBooks , "Your Favourites")



} catch (error) {
    SendResponse(res, 400, true, null, error.message)
    
}


}
