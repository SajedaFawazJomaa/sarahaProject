import auth from '../../middleware/Auth.middleware.js';
import {Router} from 'express'
import * as Usercontroller from './controller/User.controller.js';
import { fileUpload, fileValidation } from '../../services/multer.js';
import validation from '../../middleware/validation.js';
import * as validators from './User.validation.js';
import { asyncHandler } from '../../services/errorHandling.js';


const router = Router();
router.get('/',fileUpload(fileValidation.image).single('image'),validation(validators.profile),auth,
asyncHandler(Usercontroller.profile));
router.patch('/cover',fileUpload(fileValidation.image,'user').array('image'),auth,asyncHandler(Usercontroller.coverPic));

router.patch('/updatePassword',auth,validation(validators.updatePassword),asyncHandler(Usercontroller.updatePassword));
router.get('/:id/profile',validation(validators.shareProfile),asyncHandler(Usercontroller.shareProfile));



export default router;
