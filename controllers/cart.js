import SendResponse from "../helpers/sendResponse.js"
import userModel from "../models/usermodel.js"




export const addTocart = async (req, res) => {

    try {

        const { bookid } = req.headers

        const user = await userModel.findById(req.user._id)
        const isbookAdded = user.cart.includes(bookid)
        if (isbookAdded) return SendResponse(res, 400, false, null, "Book is already in your cart")

        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, { $push: { cart: bookid } },
            { new: true, runValidators: true } // <-- Ensures updated document is returned
        )

        SendResponse(res, 200, false, updatedUser, "Book added successfully ")


    } catch (error) {
        SendResponse(res, 400, true, null, error.message)

    }




}


export const removefromCart = async(req,res)=>{
try {
    
    const { bookid } = req.params
    // console.log("book id " , bookid);
    
    const user = await userModel.findById(req.user._id)
    const isbookAdded = user.cart.includes(bookid)

    if (!isbookAdded) return SendResponse(res, 400, false, null, "Book is not in your cart")



        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, { $pull: { cart: bookid } },
            { new: true, runValidators: true } // <-- Ensures updated document is returned
        )

        SendResponse(res, 200, false, updatedUser, "Book Removed successfully ")


} catch (error) {
    

        SendResponse(res, 400, true, null, error.message)


}


}

export const getUsercart = async(req,res)=>{
try {
    

const user = await userModel.findById(req.user._id).populate("cart")
const cart = user.cart.reverse()

SendResponse(res,200,false,cart , "Cart fetched successfully" )


} catch (error) {
    SendResponse(res, 400, true, null, error.message)
    
}


}