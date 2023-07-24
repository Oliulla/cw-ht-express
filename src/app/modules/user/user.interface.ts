// user.interface.ts

import { Document } from "mongoose"

export enum UserRole {
  SELLER = "seller",
  BUYER = "buyer",
  ADMIN = "admin",
}

export type IUser = {
  // Extend Document here
  password: string
  role: UserRole
  name: {
    firstName: string
    lastName: string
  }
  phoneNumber: string
  address: string
  budget: number
  income: number
} & Document
