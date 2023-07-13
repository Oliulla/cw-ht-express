import { Schema, model } from "mongoose"
import { IUser, UserModel, UserRole } from "./user.interface"

const userSchema = new Schema<IUser>(
  {
    role: {
      type: String,
      enum: [UserRole.SELLER, UserRole.BUYER, UserRole.ADMIN],
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    // needsPasswordChange: {
    //   type: Boolean,
    //   default: true,
    // },
    // passwordChangedAt: {
    //   type: Date,
    // },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "UserProfile",
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "UserProfile",
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const User = model<IUser, UserModel>("User", userSchema)
