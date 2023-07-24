/* eslint-disable @typescript-eslint/no-unused-vars */
import ApiError from "../../../errors/ApiError"
import { IUser, UserRole } from "./user.interface"
import UserModel from "./user.model"

export async function createUser(profileData: IUser): Promise<Partial<IUser>> {
  const { name, address, budget, income, phoneNumber, role, password } =
    profileData

  // Check if the phoneNumber already exists in the users collection
  const existingUser = await UserModel.findOne({ phoneNumber }).exec()
  if (existingUser) {
    throw new ApiError(
      400,
      "User with the provided phone number already exists"
    )
  }

  const newUser: IUser = new UserModel({
    password,
    role,
    name,
    phoneNumber,
    address,
    budget: role === UserRole.SELLER ? 0 : budget,
    income,
  })

  await newUser.save()

  const { password: userPassword, ...createdUserData } = newUser.toObject()

  return createdUserData
}

export const userServices = {
  createUser,
}
