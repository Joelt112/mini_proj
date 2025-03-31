import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({

    userName: {
        type: String,
        minLength: [3, "Username must caontain at least 3 characters."],
        maxLength: [40, "Username cannot exceed 40 characters."],
      },
      password: {
        type: String,
        selected: false,
        minLength: [8, "Password must caontain at least 8 characters."],
    },
    email: String,
    phone: {
      type: String,
      minLength: [10, "Phone Number must contain exact 10 digits."],
      maxLength: [10, "Phone Number must contain exact 10 digits."],
    },
   
              createdAt: {
                type: Date,
                default: Date.now,
              },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const User = mongoose.model("User", userSchema);