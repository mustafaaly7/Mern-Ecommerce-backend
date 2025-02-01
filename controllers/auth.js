import SendResponse from "../helpers/sendResponse.js";
import userModel from "../models/usermodel.js";
import bcrypt from 'bcrypt'
import { registerSchema } from "../models/validation schemas/authSchema.js";

export const registerUser = async (req, res) => {

    try {
        const { error, value } = registerSchema.validate(req.body);
        console.log("value " , value);
        
        if (error) return SendResponse(res, 400, true, null, error)

        const existingUser = await userModel.findOne({ email: value.email })

        if (existingUser) return SendResponse(res, 400, true, null, "Email Already Registered")

const hashPassword = await bcrypt.hash(value.password , 12)
value.password = hashPassword

let registerUser =  new userModel(value)
 registerUser = await registerUser.save()
 SendResponse(res, 400, true, registerUser, "User Registered Successfully")

    } catch (error) {
        SendResponse(res, 400, true, null, error.message)

    }


}

