import { Model, Types } from "mongoose"
import { IUserProfile } from "../userProfile/userProfile.interface"
import { IAdmin } from "../admin/admin.interface"

export enum UserRole {
  SELLER = "seller",
  BUYER = "buyer",
  ADMIN = "admin",
}

export type IUser = {
  role: UserRole
  password: string
  // needsPasswordChange: boolean
  // passwordChangedAt?: Date
  seller?: Types.ObjectId | IUserProfile
  buyer?: Types.ObjectId | IUserProfile
  admin?: Types.ObjectId | IAdmin
  createdAt?: string
  updatedAt?: string
}

export type UserModel = Model<IUser, Record<string, unknown>>
