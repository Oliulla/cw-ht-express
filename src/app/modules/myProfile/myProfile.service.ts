import ApiError from "../../../errors/ApiError"
import UserModel from "../user/user.model"
import { IMyProfile } from "./myProfile.interface"

// get all user
// get all users
async function getAllUsers() {
  const users = await UserModel.find().select("-password") // Exclude the 'password' field

  return users
}

// get single user
async function getSingleUser(userId: string) {
  const user = await UserModel.findById(userId).select("-password")

  return user
}

// update single user
async function updateUser(userId: string, updates: Partial<IMyProfile>) {
  const user = await UserModel.findByIdAndUpdate(userId, updates, {
    new: true,
  }).select("-password")

  if (!user) {
    throw new ApiError(404, "User not found")
  }

  return user
}
async function deleteUser(userId: string) {
  // Delete user profile
  const user = await UserModel.findByIdAndRemove(userId).select("-password")

  if (!user) {
    throw new ApiError(404, "User not found")
  }

  return user
}

export const userProfileServices = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
}
