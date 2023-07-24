import { Schema, model } from "mongoose"
import { IUserProfile } from "./userProfile.interface"

const userProfileSchema = new Schema<IUserProfile>({
  name: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  income: {
    type: Number,
    required: true,
  },
})

export const UserProfile = model<IUserProfile>("UserProfile", userProfileSchema)
