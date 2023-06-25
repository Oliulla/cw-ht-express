import { Schema, model } from "mongoose"
import { IUser, UserModel, UserRole } from "./user.interface"

const userSchema = new Schema<IUser>(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: [UserRole.SELLER, UserRole.BUYER],
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "UserProfile",
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "UserProfile",
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
