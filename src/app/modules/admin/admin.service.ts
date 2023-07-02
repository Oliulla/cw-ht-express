// import { IUser, UserRole } from "../user/user.interface"
// import { User } from "../user/user.model"
// import { Admin } from "./admin.model"

// export type adminDataType = {
//   phoneNumber: string
//   password: string
//   role: string
//   firstName: string
//   lastName: string
//   address: string
// }

// const createAdmin = async (
//   adminUserData: adminDataType
// ): Promise<Partial<IUser> | null> => {
//   const { phoneNumber, password, role, firstName, lastName, address } =
//     adminUserData
//   try {
//     // Create a new admin document
//     const newAdmin = new Admin({
//       name: {
//         firstName,
//         lastName,
//       },
//       address,
//     })
//     const savedAdmin = await newAdmin.save()

//     // Create a new user document with the admin role
//     const newUser = new User({
//       phoneNumber,
//       role: UserRole.ADMIN || role,
//       password,
//       admin: savedAdmin._id,
//     })
//     const savedUser = await newUser.save()

//     const returnData = {
//       _id: savedUser._id,
//       role: savedUser.role,
//       name: {
//         firstName: savedAdmin.name.firstName,
//         lastName: savedAdmin.name.lastName,
//       },
//       phoneNumber: savedUser.phoneNumber,
//       address: savedAdmin.address,
//     }
//     return returnData
//   } catch (error) {
//     // Handle the error
//     console.error("Error creating admin:", error)
//     return null
//   }
// }

// export const adminService = {
//   createAdmin,
// }

import ApiError from "../../../errors/ApiError"
import { IUser, UserRole } from "../user/user.interface"
import { User } from "../user/user.model"
import { Admin } from "./admin.model"

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

  // Check if the phone number is already in use
  const existingUser = await User.findOne({ phoneNumber }).exec()
  if (existingUser) {
    throw new ApiError(
      400,
      "User with the provided phone number is already exists"
    )
  }

  if (!existingUser) {
    // Create a new admin document
    const newAdmin = new Admin({
      name: {
        firstName,
        lastName,
      },
      address,
    })
    const savedAdmin = await newAdmin.save()

    // Create a new user document with the admin role
    const newUser = new User({
      phoneNumber,
      role: UserRole.ADMIN || role,
      password,
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
}

export const adminService = {
  createAdmin,
}
