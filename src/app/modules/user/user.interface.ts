import { Model, Types } from "mongoose"
import { IUserProfile } from "../userProfile/userProfile.interface"
import { IAdmin } from "../admin/admin.interface"

export enum UserRole {
  SELLER = "seller",
  BUYER = "buyer",
  ADMIN = "admin",
}

export type IUser = {
  phoneNumber: string
  role: UserRole
  password: string
  seller?: Types.ObjectId | IUserProfile
  buyer?: Types.ObjectId | IUserProfile
  admin?: Types.ObjectId | IAdmin
}

export type UserModel = Model<IUser, Record<string, unknown>>
