import  mongoose,{Schema,model} from 'mongoose';
const UserSchema = new Schema({
    userName: {
        type:String,
        required:true,        
    },

    email: {
        type:String,
        required:true, 
        unique:true,      
    },

    password: {
        type:String,
        required:true,        
    },

    confirmEmail: {
        type:Boolean,
        default:false,        
    },
    gender: {
        type:String,
        default:'Male',
        enum :['Male','Female'],      
    },
    age:{
        type:Number
    },
    profilePic:{
        type:Object,

    },
    cover:{
       type: [String], // array of string

    },

  },{   timestamps:true,

    });

    const userModel = mongoose.models.User || model('User',UserSchema);
    export default userModel;
