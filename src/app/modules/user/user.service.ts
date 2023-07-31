import bcrypt from "bcrypt"
/* eslint-disable @typescript-eslint/no-unused-vars */
import ApiError from "../../../errors/ApiError"
import { IUser, IUserLoginResponse, UserRole } from "./user.interface"
import UserModel from "./user.model"
import { jwtHelpers } from "../../../helpers/jwtHelper"
import config from "../../../config"
import { Secret } from "jsonwebtoken"
import { IRefreshTokenResponse } from "../admin/admin.interface"

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

const userLogin = async (
  phoneNumber: string,
  password: string
): Promise<IUserLoginResponse> => {
  const user = await UserModel.findOne({ phoneNumber }).exec()
  const userJSON = user?.toJSON()

  if (!userJSON) {
    throw new ApiError(401, "Invalid phone number or password")
  }

  const isPasswordValid = await bcrypt.compare(password, userJSON.password)

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid phone number or password")
  }

  const accessToken = jwtHelpers.createToken(
    { user_id: userJSON._id, role: userJSON.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  )

  const refreshToken = jwtHelpers.createToken(
    { user_id: userJSON._id, role: userJSON.role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  )

  return { accessToken, refreshToken }
}

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    )
  } catch (err) {
    throw new ApiError(403, "Invalid Refresh Token")
  }

  const { user_id } = verifiedToken

  const user = await UserModel.findById(user_id).exec()
  if (!user) {
    throw new ApiError(404, "User does not exist")
  }

  const newAccessToken = jwtHelpers.createToken(
    {
      user_id: user._id,
      role: user.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  )

  return {
    accessToken: newAccessToken,
  }
}

export const userService = {
  createUser,
  userLogin,
  refreshToken,
}
