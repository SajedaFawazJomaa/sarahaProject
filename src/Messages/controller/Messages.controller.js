import userModel from "../../../../DB/Models/User.model.js";
import MessageModel from '../../../../DB/Models/Message.model.js'



export const getMessages= async(req,res)=>{
   const messagesList = await MessageModel.find();
   return res.json({message:"success",messagesList});

}


export const sendMessage = async(req,res)=>{
   const {receiverId} = req.params;
   const {messages} = req.body;
   const user = await userModel.findById({_id:receiverId});
   
   if(!user){
      return res.status(404).json({message:"user not found"});
   }else{
   
      const createMessage = await MessageModel.create({
         messages,receiverId
      });

      return res.status(201).json({message:"success",createMessage});
   }
   
}
