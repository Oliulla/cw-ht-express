import { Model } from "mongoose"

export type IAdmin = {
  name: {
    firstName: string
    lastName: string
  }
  address: string
}

export type AdminModel = Model<IAdmin, Record<string, unknown>>

export type IAdminLoginResponse = { accessToken: string; refreshToken: string }
