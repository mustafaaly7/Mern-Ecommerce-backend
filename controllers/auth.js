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

