import jwt from "jsonwebtoken";
import sendResponse from "../helpers/sendResponse.js";
import 'dotenv/config'


export  function authenticateUser(req,res,next){
const bearerToken = req.headers?.authorization;
if(!bearerToken) return sendResponse(res , 404 , null ,true , "Token not found")

    const token = bearerToken.split(' ')[1]
    const decoded  = jwt.verify(token , process.env.AUTH_SECRET)
req.user = decoded
// console.log("decoded => " , decoded);
next()

}


export function authenticateAdmin(req,res,next){



    const bearerToken = req.headers?.authorization;
    if(!bearerToken) return sendResponse(res , 404 , null ,true , "Token not found")
        const token = bearerToken.split(' ')[1]

    const decoded  = jwt.verify(token , process.env.AUTH_SECRET)


    if(decoded.role == "admin"){

        req.user = decoded
        console.log("decoded => " , decoded);
        next()
    }else{

     sendResponse(res , 404 , null ,true , "you're not authorized to access that page ")
} 
}