import bcrypt from "bcrypt"
import { Secret } from "jsonwebtoken"
import config from "../../../config"
import ApiError from "../../../errors/ApiError"
import { jwtHelpers } from "../../../helpers/jwtHelper"
import { IUser, UserRole } from "../user/user.interface"
import { User } from "../user/user.model"
import { Admin } from "./admin.model"
import { IAdminLoginResponse } from "./admin.interface"

export type adminDataType = {
  phoneNumber: string
  password: string
  role: string
  firstName: string
  lastName: string
  address: string
}

const createAdmin = async (
  adminUserData: adminDataType
): Promise<Partial<IUser> | undefined> => {
  const { phoneNumber, password, role, firstName, lastName, address } =
    adminUserData

  const existingUser = await User.findOne({ phoneNumber }).exec()
  if (existingUser) {
    throw new ApiError(
      400,
      "User with the provided phone number already exists"
    )
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bycrypt_salt_rounds)
  )

  const newAdmin = new Admin({
    name: {
      firstName,
      lastName,
    },
    address,
  })
  const savedAdmin = await newAdmin.save()

  const newUser = new User({
    phoneNumber,
    role: UserRole.ADMIN || role,
    password: hashedPassword, // Store the hashed password
    admin: savedAdmin._id,
  })
  const savedUser = await newUser.save()

  const returnData = {
    _id: savedUser._id,
    role: savedUser.role,
    name: {
      firstName: savedAdmin.name.firstName,
      lastName: savedAdmin.name.lastName,
    },
    phoneNumber: savedUser.phoneNumber,
    address: savedAdmin.address,
  }

  return returnData
}

const adminLogin = async (
  phoneNumber: string,
  password: string
): Promise<IAdminLoginResponse> => {
  const user = await User.findOne({ phoneNumber }).exec()

  if (!user) {
    throw new ApiError(401, "Invalid phone number or password")
  }

  // Compare the hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid phone number or password")
  }

  // Generate the access token
  const accessToken = jwtHelpers.createToken(
    { admin_id: user._id, role: user.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  )

  const refreshToken = jwtHelpers.createToken(
    { admin_id: user._id, role: user.role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  )

  return { accessToken, refreshToken }
}

export const adminService = {
  createAdmin,
  adminLogin,
}
