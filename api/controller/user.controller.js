import User from "../models/user.model.js";
import { eroorhandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import Listing from "../models/listing.model.js";
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
        res.status(200).json(rest)

    }catch(error)
    {
        next(error)
    }

};

export const deleteUser =async (req,res,next)=>{
    if(req.user.id !== req.params.id)
        return next(eroorhandler(401, 'You can only delete your own account!'));
   try{
       await User.findByIdAndDelete(req.params.id);
       res.clearCookie('access_token');
       res.status(200).json('User has been deleted');
   }catch(error)
   {
       next(error)
   }

};

export const getUserListings = async(req, res, next)=>{
    if(req.user.id === req.params.id)
    {
      try{
        const listings = await Listing.find({userRef:req.params.id});
        res.status(200).json(listings);
      }catch(error)
      {
           next(error)
      }
    }else{
        return next(eroorhandler(401, 'You can only view your own listings'));
    }
};

export const getUser =async (req,res,next)=>{
  try{
    const user = await User.findById(req.params.id);
  if(!user) return next(eroorhandler(404, 'User not found!'));
  const {password:pass, ...rest} = user._doc;
  res.status(200).json(rest);
  }catch(error)
  {
    next(error);
  }

};