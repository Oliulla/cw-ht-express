import ApiError from "../../../errors/ApiError"
import { User } from "../user/user.model"
import { IUserProfile } from "./userProfile.interface"
import { UserProfile } from "./userProfile.model"

// get all user
async function getAllUsers() {
  const users = await User.find().populate("buyer").populate("seller").exec()

  return users
}

// get single user
async function getSingleUser(userId: string) {
  const user = await User.findById(userId)
    .populate("buyer")
    .populate("seller")
    .exec()

  return user
}

// update single user
async function updateUser(userId: string, updates: Partial<IUserProfile>) {
  // console.log(userId)
  const user = await User.findById(userId)

  const userProfileId = user?.buyer || user?.seller
  // console.log(userProfileId)

  await UserProfile.findOne({ _id: userProfileId }, updates, {
    new: true,
  })

  const userProfileUpdateResult = await User.findById(userId)
    .populate("seller")
    .populate("buyer")
    .exec()
  return userProfileUpdateResult
}

async function deleteUser(userId: string) {
  // Delete user profile
  const user = await User.findByIdAndRemove(userId)
    .populate("buyer")
    .populate("seller")
    .exec()

  if (!user) {
    throw new ApiError(404, "User not found")
  }

  // Delete corresponding user from users collection
  const userProfile = await UserProfile.findOneAndRemove({
    $or: [{ _id: user.seller }, { _id: user.buyer }],
  })

  // console.log(user)

  if (!userProfile) {
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
