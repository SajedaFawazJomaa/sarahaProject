import mongoose from "mongoose";
import 'dotenv/config';



const connectDB = async()=>{
    
    return await mongoose.connect(process.env.DB_LOCAL)
    .then( ()=>{
        console.log("db connection established");
    })
    .catch( (error)=>{
        console.log(`error to connect db : ${error}`);
    } );
}

export default connectDB;
