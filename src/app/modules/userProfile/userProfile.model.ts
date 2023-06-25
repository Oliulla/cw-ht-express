import { Schema, model } from "mongoose"
import { IUserProfile } from "./userProfile.interface"

// type IUserProfile = {
//   name: {
//     firstName: string
//     lastName: string
//   }
//   address: string
//   budget: number
//   income: number
// }

const userProfileSchema = new Schema<IUserProfile>(
  {
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
  },
  {
    timestamps: true,
  }
)

export const UserProfile = model<IUserProfile>("UserProfile", userProfileSchema)
