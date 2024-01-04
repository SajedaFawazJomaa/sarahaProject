import joi from 'joi';
import { generalFields } from '../../middleware/validation.js';


export const signupSchema = {
    body: joi.object({
        
    userName:joi.string().alphanum().required(),
    email:generalFields.email,
    gender:joi.string().valid('Male','Female'),
    age:joi.number().integer().min(20).max(80).required(),
    password:generalFields.password,
    cpassword:joi.string().valid(joi.ref('password')).required(),
    }),
    query: joi.object({ 
        test:joi.boolean(),
    })
}
export const signinSchema = joi.object({
    email:generalFields.email,
    password:generalFields.password,
   
});
