
import { generalFields } from '../../middleware/validation.js';
import joi  from 'joi';


export const profile = {
    file:generalFields.file.required(),
}

export const updatePassword = {
    body:joi.object({
        oldPassword:generalFields.password,
        newPassword:generalFields.password.invalid(joi.ref('oldPassword')),
        cpassword:joi.string().valid(joi.ref('newPassword')).required(),


    })
   
};  

export const shareProfile = {
    params:joi.object({
        id:generalFields.id,
    })
}
