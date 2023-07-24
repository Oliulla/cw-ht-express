/* eslint-disable @typescript-eslint/no-unused-vars */
import bcrypt from "bcrypt"
import { Secret } from "jsonwebtoken"
import config from "../../../config"
import ApiError from "../../../errors/ApiError"
import { jwtHelpers } from "../../../helpers/jwtHelper"
import { Admin } from "./admin.model"
import {
  IAdmin,
  IAdminLoginResponse,
  IRefreshTokenResponse,
} from "./admin.interface"
import UserModel from "../user/user.model"
import { UserRole } from "../user/user.interface"

const createAdmin = async (
  adminUserData: IAdmin
): Promise<IAdmin | undefined> => {
  const { phoneNumber, password, name, address } = adminUserData

  const existingUser = await UserModel.findOne({ phoneNumber }).exec()
  if (existingUser) {
    throw new ApiError(
      400,
      "User with the provided phone number is already exists"
    )
  }
  const newAdmin = new Admin({
    phoneNumber,
    password,
    role: UserRole.ADMIN,
    name,
    address,
  })
  const savedAdmin = await newAdmin.save()
  const { password: adminSavedPass, ...adminSavedProps } = savedAdmin.toJSON()
  return adminSavedProps as IAdmin
}

const adminLogin = async (
  phoneNumber: string,
  password: string
): Promise<IAdminLoginResponse> => {
  // console.log(phoneNumber, password)
  const admin = await Admin.findOne({ phoneNumber }).exec()
  const adminJSON = admin?.toJSON()
  // console.log(adminJSON)

  if (!adminJSON) {
    throw new ApiError(401, "Invalid phone number or password")
  }

  // Compare the hashed password
  const isPasswordValid = await bcrypt.compare(password, adminJSON.password)

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid phone number or password")
  }

  // Generate the access token
  const accessToken = jwtHelpers.createToken(
    { admin_id: adminJSON._id, role: adminJSON.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  )

  const refreshToken = jwtHelpers.createToken(
    { admin_id: adminJSON._id, role: adminJSON.role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  )

  return { accessToken, refreshToken }
}

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  // invalid token - synchronous
  let verifiedToken = null
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    )
  } catch (err) {
    throw new ApiError(403, "Invalid Refresh Token")
  }

  const { admin_id } = verifiedToken

  // tumi delete hye gso  kintu tumar refresh token ase
  // checking deleted user's refresh token

  const isUserExist = await Admin.isUserExist(admin_id)
  if (!isUserExist) {
    throw new ApiError(404, "User does not exist")
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      admin_id: isUserExist._id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  )

  return {
    accessToken: newAccessToken,
  }
}

export const adminService = {
  createAdmin,
  adminLogin,
  refreshToken,
}
