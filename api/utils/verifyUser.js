import { eroorhandler } from "./error.js";
import jwt from "jsonwebtoken";
export const verifyToken =(req,res,next)=>{
    const token= req.cookies.access_token;
    console.log(token);
    //Once get the token verify it
    if(!token)  return next(eroorhandler(401, 'Unauthorized'))
    jwt.verify(token, process.env.JWT_SECRET, (err,user) =>{
        if(err) return next(eroorhandler(403, 'Forbidden'))

            // No error send user to next thing
            req.user= user;
            next();
    });

}