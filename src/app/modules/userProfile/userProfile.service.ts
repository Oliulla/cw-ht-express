import ApiError from "../../../errors/ApiError"
import { User } from "../user/user.model"
import { IUserProfile } from "./userProfile.interface"
import { UserProfile } from "./userProfile.model"

async function getUserProfiles() {
  const users = await User.find().populate("buyer").populate("seller").exec()

  return users
}

async function getSingleUserProfile(userId: string) {
  const user = await UserProfile.findById(userId)

  return user
}

async function updateUser(userId: string, updates: Partial<IUserProfile>) {
  const user = await UserProfile.findByIdAndUpdate(userId, updates, {
    new: true,
  })
  return user
}

async function deleteUser(userId: string) {
  // Delete user profile
  const userProfile = await UserProfile.findByIdAndRemove(userId)
    .populate("buyer")
    .populate("seller")
    .exec()

  if (!userProfile) {
    throw new ApiError(404, "User not found")
  }

  // Delete corresponding user from users collection
  const user = await User.findOneAndRemove({
    $or: [{ seller: userId }, { buyer: userId }],
  })

  if (!user) {
    throw new ApiError(404, "User not found")
  }

  return userProfile
}

export const userProfileServices = {
  getUserProfiles,
  getSingleUserProfile,
  updateUser,
  deleteUser,
}
