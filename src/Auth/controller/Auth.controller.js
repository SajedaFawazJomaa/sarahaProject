import userModel from "../../../../DB/Models/User.model.js";
import { sendEmail } from "../../../services/sendEmail.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const getAuth = (req, res) => {
  return res.json({ message: "Auth" });
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new Error("data Ivalid"));
  }
  if (!user.confirmEmail) {
    return next(new Error("plz confirm your email"));
  }

  const match = bcrypt.compareSync(password, user.password);
  if (!match) {
    return next(new Error("data Ivalid"));
  }
  const token = jwt.sign({ _id: user._id }, process.env.LOGINSIGNATURE);
  return res.status(200).json({ message: "success", token });
};

export const signup = async (req, res) => {
  const { userName, email, password, gender } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    return res.status(409).json({ message: "Email exists" });
  }
  const hashedPassword = bcrypt.hashSync(
    password,
    parseInt(process.env.SALTROUND)
  );
  const createUser = await userModel.create({
    userName,
    email,
    password: hashedPassword,
    gender,
  });
  const token = jwt.sign({ email }, process.env.EMAILTOKEN, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign({ email }, process.env.EMAILTOKEN, {
    expiresIn: 60 * 60 * 24,
  });
  const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`;
  const refreshLink = `${req.protocol}://${req.headers.host}/auth/NewconfirmEmail/${refreshToken}`;
  const html = `<a href=${link}>verify Email</a> or <a href=${refreshLink}> request new email to verify your email </a>`;
  sendEmail(email, "confirm Email", html);
  return res.status(201).json({ message: "success", user: createUser._id });
};

export const confirmEmail = async (req, res, next) => {
  const { token } = req.params;
  const decoded = jwt.verify(token, process.env.EMAILTOKEN);
  const user = await userModel.findOneAndUpdate(
    { email: decoded.email, confirmEmail: false },
    { confirmEmail: true }
  );
  if (!user) {
    return res.json({ message: process.env.FRONTEND_LOGIN });
  }
};

export const NewconfirmEmail = async (req, res, next) => {
  const { Refreshtoken } = req.params;
  const decoded = jwt.verify(Refreshtoken, process.env.EMAILTOKEN);
  // return res.json(decoded);
  const token = jwt.sign({ email: decoded.email }, process.env.EMAILTOKEN, {
    expiresIn: "1h",
  });
  const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`;
  const html = `<a href=${link}>verify Email</a>`;
  sendEmail(decoded.email, "confirm Email", html);
  return res.status(201).json({ message: "success", user: createUser._id });
};
