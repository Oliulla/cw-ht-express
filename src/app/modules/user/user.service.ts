import config from "../../../config"
import ApiError from "../../../errors/ApiError"
import { UserProfile } from "../userProfile/userProfile.model"
import { UserRole } from "./user.interface"
import { User } from "./user.model"
import bcrypt from "bcrypt"

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
  // console.log(profileData)
  const {
    firstName,
    lastName,
    address,
    budget,
    income = 0,
    phoneNumber,
    role,
    password,
  } = profileData

  // Hash the password
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bycrypt_salt_rounds)
  )

  // Check if the phoneNumber already exists in the users collection
  const existingUser = await UserProfile.findOne({ phoneNumber }).exec()
  if (existingUser) {
    throw new ApiError(
      400,
      "User with the provided phone number already exists"
    )
    return
  }

  const userProfile = new UserProfile({
    name: {
      firstName,
      lastName,
    },
    phoneNumber,
    address,
    budget: role === "seller" ? 0 : budget,
    income: role === "buyer" ? 0 : income,
  })
  await userProfile.save()

  const user = new User({
    role,
    password: hashedPassword,
    seller: role === UserRole.SELLER ? userProfile._id : undefined,
    buyer: role === UserRole.BUYER ? userProfile._id : undefined,
  })
  await user.save()

  const result = {
    _id: user._id,
    // password: user.password,
    role: user.role,
    name: userProfile.name,
    phoneNumber: userProfile.phoneNumber,
    address: userProfile.address,
    budget: userProfile.budget,
    income: userProfile.income,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }

  return result
}

export const userServices = {
  createUser,
}
