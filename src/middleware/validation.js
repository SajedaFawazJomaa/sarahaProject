import joi from "joi";
import { Types } from "mongoose";
const dataMethods = ["body", "query", "params", "headers", "file"];
const validationObjectId = (value, helper) => {
  if (Types.ObjectId.isValid(value)) {
    return true;
  }
  return helper.message();
};
export const generalFields = {
  id: joi.string().min(24).max(24).custom(validationObjectId).required(),

  email: joi.string().email().required().min(5).messages({
    "string.empty": "email is required",
    "string.email": "plz enter a valid email",
  }),

  password: joi.string().required().min(3).messages({
    "string.empty": "password is required",
  }),
  file: joi.object({
    size: joi.number().positive().required(),
    path: joi.string().required(),
    filename: joi.string().required(),
    destination: joi.string().required(),
    mimetype: joi.string().required(),
    encoding: joi.string().required(),
    originalname: joi.string().required(),
    dest: joi.string(),
    fieldname: joi.string().required(),
  }),
};
const validation = (Schema) => {
  return (req, res, next) => {
    const dataMethods = ["body", "query", "params", "headers", "file"];
    const validationArray = []; // عشان اخرن فيها الاخطاء
    dataMethods.forEach((key) => {
      //  console.log(key);
      if (Schema[key]) {
        const validationResult = Schema[key].validate(req[key], {
          abortEarly: false,
        });
        if (validationResult.error) {
          validationArray.push(validationResult.error.details);
        }
      }
    });
    if (validationArray.length > 0) {
      return res.json({ message: "validation error", validationArray });
    } else {
      next();
    }
  };
};
export default validation;
