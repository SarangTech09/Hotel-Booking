import User from "../models/User.js";

//Middleware to check if the user is authenticated

export const protect = async (req, res, next)=>{
    const {userId} = await req.auth();
    console.log("Authenticated userId:", userId);
    if(!userId){
        res.json({success: false, message: "not authenticated"})
    }else{
        const user = await User.findById(userId);
        req.user = user;
        next();
    }
}