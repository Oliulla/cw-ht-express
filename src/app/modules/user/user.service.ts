import ApiError from "../../../errors/ApiError"
import { UserProfile } from "../userProfile/userProfile.model"
import { UserRole } from "./user.interface"
import { User } from "./user.model"

export type NewUserData = {
  password: string
  role: string
  firstName: string
  lastName: string
  phoneNumber: string
  address: string
  budget: number
  income: number
}

async function createUser(profileData: NewUserData) {
  const {
    firstName,
    lastName,
    address,
    budget,
    income,
    phoneNumber,
    role,
    password,
  } = profileData

  // Check if the phoneNumber already exists in the users collection
  const existingUser = await User.findOne({ phoneNumber }).exec()
  if (existingUser) {
    throw new ApiError(
      400,
      "User with the provided phone number already exists"
    )
  }

  if (!existingUser) {
    const userProfile = new UserProfile({
      name: {
        firstName,
        lastName,
      },
      address,
      budget: role === "seller" ? 0 : budget,
      income,
    })
    await userProfile.save()

    const user = new User({
      phoneNumber,
      role,
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
      seller: role === UserRole.SELLER ? userProfile._id : undefined,
      buyer: role === UserRole.BUYER ? userProfile._id : undefined,
    })
    await user.save()

    return userProfile
  }
}

export const userServices = {
  createUser,
}
