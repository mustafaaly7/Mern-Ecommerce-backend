import SendResponse from "../helpers/sendResponse.js"
import orderModel from "../models/ordermodel.js"
import userModel from "../models/usermodel.js"


export const placeOrder = async (req, res) => {

    try {
        // destructing order from req.body 
        const { order } = req.body

        for (const orderData of order) {

            // saving order info with using forof loop on req.body order  and 

            const newOrder = new orderModel({ user: req.user._id, book: orderData._id })
            
            const orderFromDB =await newOrder.save()

            // saving inside user order info 

            const userOrder = await userModel.findByIdAndUpdate(req.user._id, {
                $push: {
                    orders: orderFromDB._id
                }
            },
            { new: true, runValidators: true })

            // now removing and clearing user cart 

            const userCart = await userModel.findByIdAndUpdate(req.user._id, {
                $pull: {
                    cart: orderData._id
                }
            },
            { new: true, runValidators: true })

        }

        SendResponse(res, 200, false, null, "Order Placed Successfully")





    } catch (error) {
        SendResponse(res, 400, true, null, error.message)
    }

}


export const orderHistory =async(req,res)=>{

try {
    
const user = await userModel.findById(req.user._id).
populate({
    path : "orders",
    populate:{path: 'book'}
})

console.log("user" , user);

const orderData = user.orders.reverse()
SendResponse(res, 200, false, orderData, "order fetched succesfully")


} catch (error) {
    SendResponse(res, 400, true, null, error.message)
}

}



export const updateOrderstatus = async(req,res)=>{
try {
    
const{id} = req.params
console.log("order" , id);

const orderUpdation = await orderModel.findByIdAndUpdate(id ,{status:req.body.status})


SendResponse(res, 200, false ,orderUpdation, "Order Updated Successfully")



} catch (error) {
    SendResponse(res, 400, true, null, error.message)
    
}


}





export const getAllorders =async (req,res)=>{
try {
    const orders = await orderModel.find().populate("user").populate("book").sort({createdAt:-1})


    
    SendResponse(res, 200, false, orders, "all orders fetch successfully")


} catch (error) {
    SendResponse(res, 400, true, null, error.message)
    
}



}

