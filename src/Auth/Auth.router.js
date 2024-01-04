import express from 'express'
import * as Authcontroller from './controller/Auth.controller.js';
import  {asyncHandler} from '../../services/errorHandling.js';
import validation from '../../middleware/validation.js';
import { signinSchema, signupSchema } from './Auth.validation.js';
const app = express();
app.get('/',Authcontroller.getAuth);
app.post('/signup', validation(signupSchema),asyncHandler(Authcontroller.signup));
app.post('/signin', validation(signinSchema),asyncHandler(Authcontroller.signin));
app.get('/confirmEmail/:token',asyncHandler(Authcontroller.confirmEmail));
app.get('/NewconfirmEmail/:Refreshtoken',asyncHandler(Authcontroller.NewconfirmEmail));

export default app;
