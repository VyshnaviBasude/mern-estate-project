import User from "../models/user.model.js";
import { eroorhandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
export const test = (req,res)=>{
    res.json({
        message:'API ROUTE !',
    });
}
export const updateUser =async (req,res,next)=>{
    //If get a request 
    if(req.user.id !== req.params.id)
        return next(eroorhandler(401,'You can only update your own account!'))
    try{
        //When user trie sto change the password we need  to hash it
        if(req.body.password)
        {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                //cannot just update the body but need to do whatever fields we are having
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        },{new: true})
        const {password, ...rest} = updatedUser._doc
        res.status(200).json({
            success:true,
            message:"User Updated Succesfully",
            user:rest
        })

    }catch(error)
    {
        next(error)
    }

};