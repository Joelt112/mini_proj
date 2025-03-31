import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";
import { generateToken } from "../utils/jwtToken.js";


// register
export const register = catchAsyncErrors(async (req, res, next) => {
  const { userName, email, password, phone } = req.body;

  if (!userName || !email || !phone || !password) {
    return next(new ErrorHandler("Please fill all required fields.", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("User already registered.", 400));
  }

  const user = await User.create({
    userName,
    email,
    password,
    phone,
  });

  generateToken(user, "User registered successfully", 201, res);
});
// login

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please fill full form."));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid credentials.", 400));
  }
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid credentials.", 400));
  }
  generateToken(user, "Login successfully.", 200, res); 
 });

// GET profile

export const getProfile = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
 });
 
// GET logout

 export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logout Successfully.",
    });
});
