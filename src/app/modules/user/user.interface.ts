import { Model, Types } from "mongoose"
import { IUserProfile } from "../userProfile/userProfile.interface"

export enum UserRole {
  SELLER = "seller",
  BUYER = "buyer",
}

export type IUser = {
  phoneNumber: string
  role: UserRole
  password: string
  seller?: Types.ObjectId | IUserProfile
  buyer?: Types.ObjectId | IUserProfile
}

export type UserModel = Model<IUser, Record<string, unknown>>
