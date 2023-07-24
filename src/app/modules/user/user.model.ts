// user.model.ts

import mongoose, { Document, Model } from "mongoose"
import { IUser, UserRole } from "./user.interface"
import bcrypt from "bcrypt"
import config from "../../../config"

const userSchema = new mongoose.Schema<IUser>(
  {
    password: { type: String, required: true },
    role: {
      type: String,
      enum: [UserRole.SELLER, UserRole.BUYER, UserRole.ADMIN],
      required: true,
    },
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    phoneNumber: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    budget: { type: Number, required: true },
    income: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

// Hash the password before saving
userSchema.pre<IUser & Document>("save", async function (next) {
  if (!this.isModified("password")) {
    return next()
  }

  try {
    const salt = await bcrypt.genSalt(Number(config.bcrypt_salt_rounds))
    this.password = await bcrypt.hash(this.password, salt)
    return next()
  } catch (error) {
    return next(error as Error) // Cast 'error' to 'Error'
  }
})

// We use IUser to define both Document and Model for type safety
const UserModel: Model<IUser & Document> = mongoose.model<IUser>(
  "User",
  userSchema
)

export default UserModel
