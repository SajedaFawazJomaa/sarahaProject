import userModel from "../../../../DB/Models/User.model.js";
import { asyncHandler } from "../../../services/errorHandling.js";
import bcrypt from "bcryptjs";
import cloudinary from "../../../services/cloudinary.js";

export const profile = async (req, res, next) => {
  if (!req.file) {
    return next(new Error("please provide a file"));
  }
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    {
      folder: `${process.env.APP_NAME}/user/${req.user._id}/profile`,
    }
  );
 
  const user = await userModel.findByIdAndUpdate(
    req.user.id,
    { profilePic: { secure_url, public_id } },
    { new: false }
  );
  
  if (user.profilePic) {
    await cloudinary.uploader.destroy(user.profilePic.public_id);
  }
  return res.json({ message: user });
};

export const coverPic = async (req, res, next) => {
  const coverPic = [];
  for (const file of req.files) {
    // بتلف على العناصر وما بترجع اشي
    coverPic.push(`uploads/${file.filename}`);
    const user = await userModel.findByIdAndUpdate(
      req._id,
      { cover: coverPic },
      { new: true }
    );
    return res.status(200).json({ message: "success" });
  }
};

export const updatePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const user = await userModel.findById(req.user._id);
  const match = bcrypt.compareSync(oldPassword, user.password); // مقارنة بين الباسوورد القديمة والباسوورد اللي في الداتا بيس

  if (!match) {
    return next(new Error("Invalid old password"));
  }
  const hashedPassword = bcrypt.hashSync(
    newPassword,
    parseInt(process.env.SALTROUND)
  );
  return res.status(200).json({ message: "success",user });
};

export const shareProfile = async (req, res, next) => {
  const user = await userModel.findById(req.params.id).select("userName email");
  if (!user) {
    return next(new Error("user not found"));
  }
  return res.json({ message: "success", user });
};
