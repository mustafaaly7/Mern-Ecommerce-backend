import mongoose, { Types } from "mongoose";
const { Schema } = mongoose

const orderSchema = new Schema({
user: {
    type: mongoose.Types.ObjectId,
    ref: "Users"

  },
  status:{
    type : String,
    enum :["Order placed" , "Out for delivery", "delivered","canceled" ],
    default:"Order placed"
  },
  book:{
    type: mongoose.Types.ObjectId,
    ref: "books"

  }


},{timestamps:true})


const orderModel = mongoose.model("orders", orderSchema)
export default orderModel
