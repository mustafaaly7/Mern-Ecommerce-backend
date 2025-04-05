import SendResponse from "../helpers/sendResponse.js";
import userModel from "../models/usermodel.js";
import bcrypt from 'bcrypt'
import { loginSchema, registerSchema } from "../models/validation schemas/authSchema.js";
import 'dotenv/config'
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {

    try {
        const { error, value } = registerSchema.validate(req.body);

        if (error) return SendResponse(res, 400, true, null, error)

        const existingUser = await userModel.findOne({ email: value.email })

        if (existingUser) return SendResponse(res, 400, true, null, "Email Already Registered")

        const hashPassword = await bcrypt.hash(value.password, 12)
        value.password = hashPassword

        let registerUser = new userModel(value)
        registerUser = await registerUser.save()
        SendResponse(res, 201, true, registerUser, "User Registered Successfully")

    } catch (error) {
        SendResponse(res, 400, true, null, error.message)

    }


}

export const loginUser = async (req, res) => {
    try {
        const { error, value } = loginSchema.validate(req.body)
        if (error) return SendResponse(res, 400, true, null, error)

        const existingUser = await userModel.findOne({ email: value.email }).lean()
        if (!existingUser) return SendResponse(res, 404, true, null, "Email Not Found")

const loginPassword = await bcrypt.compare(value.password, existingUser.password)

if(!loginPassword) return SendResponse(res, 404, true, null, "invalid password")
    
    delete existingUser.password

const token = jwt.sign(existingUser,process.env.AUTH_SECRET)

SendResponse(res, 200, false, {token  , existingUser}, "User Logged In succesfully")
    

    } catch (error) {
        SendResponse(res, 400, true, null, error.message)

    }




}

export const userInfo =async (req,res)=>{

const user = await userModel.find({_id : req.user._id}).populate("favourites").populate("orders").populate({
    path: "orders", // Populate orders
    populate: {
      path: "book", // Nested population for books inside orders
    },
  }).populate("cart")
delete user.password
SendResponse(res ,200 ,false , user ,"User info fetched successfully")





}




export const getAlluser = async(req,res)=>{

    try {
        
        const allUser = await userModel.find().populate("cart").populate("favourites").populate("orders").populate({
            path: "orders",
            populate:{
                path:"book",
            },
        })
if(!allUser) return SendResponse(res , 400 , true , null , "no user found")
        
SendResponse(res , 200 , false , allUser , "Users Fetched Successfully")



    } catch (error) {
        SendResponse(res, 400 , true, null  , error.message)
    }

}


export const deleteUser = async(req,res)=>{
try {
const {userid} = req.headers

    
const user = await userModel.findByIdAndDelete(userid)

console.log("user" , user);

SendResponse(res, 400 , true, null  , "user deleted Successfully")




} catch (error) {
    SendResponse(res, 400 , true, null  , error.message)


}




    
}
