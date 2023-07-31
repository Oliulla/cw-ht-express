/* eslint-disable @typescript-eslint/no-explicit-any */
import { Document, Model } from "mongoose"
import { UserRole } from "../user/user.interface"

export enum AdminRole {
  ADMIN = "admin",
}

export type IAdmin = {
  phoneNumber: string
  role: AdminRole
  password: string
  name: {
    firstName: string
    lastName: string
  }
  address: string
} & Document

export type AdminModel = {
  isUserExist(admin_id: string): Promise<IAdmin | null>
} & Model<IAdmin>

export type IAdminLoginResponse = {
  accessToken: string
  refreshToken?: string
}

export type IRefreshTokenResponse = {
  accessToken: string
}

export type IVerifiedLoginUser = {
  userId: string
  role: UserRole
}
