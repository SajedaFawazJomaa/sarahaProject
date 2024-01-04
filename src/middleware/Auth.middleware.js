import jwt from 'jsonwebtoken';
import userModel from '../../DB/Models/User.model.js';


const auth = async (req,res,next) =>{

      const {authorization} = req.headers;
    if(!authorization?.startsWith(process.env.BEARERKEY)){
        
         return res.status(401).json({ message: "Invalid authorization" });
    }
     const token = authorization.split(process.env.BEARERKEY)[1];
    if(!token){
      return res.status(401).json({ message: "Unauthorized: Token is missing or invalid" });
     }
     const decoded = jwt.verify(token,process.env.LOGINSIGNATURE);
     const authUser = await userModel.findById(decoded._id).select("userName email");
     if(!authUser){
        return res.json({message:"not register aacount"});
     }
     req.user = authUser;
     next();
  
      
    }
   

export default auth;
