import { Schema, model } from "mongoose"
import { IMyProfile } from "./myProfile.interface"

const userProfileSchema = new Schema<IMyProfile>({
  role: String,
  password: {
    type: String,
  },
  name: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
  },
  phoneNumber: {
    type: String,
    unique: true,
  },
  address: {
    type: String,
  },
  budget: {
    type: Number,
  },
  income: {
    type: Number,
  },
})

export const UserProfile = model<IMyProfile>("UserProfile", userProfileSchema)
