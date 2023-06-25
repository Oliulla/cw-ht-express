import { Model, Types } from "mongoose"
import { IUser } from "../user/user.interface"

export enum Location {
  Dhaka = "Dhaka",
  Chattogram = "Chattogram",
  Barishal = "Barishal",
  Rajshahi = "Rajshahi",
  Sylhet = "Sylhet",
  Comilla = "Comilla",
  Rangpur = "Rangpur",
  Mymensingh = "Mymensingh",
}

export enum Label {
  ForSale = "for sale",
  SoldOut = "sold out",
}

export enum Category {
  Dairy = "Dairy",
  Beef = "Beef",
  DualPurpose = "Dual Purpose",
}

export type ICow = {
  name: string
  age: number
  price: number
  location: Location
  breed: string
  weight: number
  label: Label
  category: Category
  seller: Types.ObjectId | IUser
}

export type CowModel = Model<ICow, Record<string, unknown>>

export type ICowFilters = {
  searchTerm: string
  minPrice: number
  maxPrice: number
  location: string
}
