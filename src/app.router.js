import MessagesRouter from './Messages/Messages.router.js'
import AuthRouter from './Auth/Auth.router.js';
import UserRouter from './User/User.router.js';
import connectDB from '../../DB/connection.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fullPath = path.join(__dirname,'../uploads');

const initApp = (app,express)=>{
    console.log(fullPath);
    connectDB();
    app.use(cors());
    app.use('/uploads',express.static('uploads'));
    app.use(express.json());
    app.use('/message',MessagesRouter);
    app.use('/auth',AuthRouter);
    app.use('/user',UserRouter);
    app.use('*', (req,res)=>{
        return res.json({message:"page not found"});
    })
    app.use( (err,req,res,next)=>{
        if(err){
            return res.json({message:err.message});
        }
    })
}

export default initApp;
