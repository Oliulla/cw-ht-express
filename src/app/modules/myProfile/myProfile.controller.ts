import { Request, Response } from "express"
import { userProfileServices } from "./myProfile.service"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"

const getUserProfiles = catchAsync(async (req: Request, res: Response) => {
  const result = await userProfileServices.getAllUsers()

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Users retrieve successfully",
    data: result,
  })
})

const getSingleUserProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id
  const result = await userProfileServices.getSingleUser(userId)

  if (!result) {
    return sendResponse(res, {
      success: true,
      statusCode: 404,
      message: "User profile not found",
      data: result,
    })
  }

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User profile retrieved successfully",
    data: result,
  })
})

const updateUserProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id
  const updates = req.body
  // console.log(updates)
  const result = await userProfileServices.updateUser(userId, updates)

  if (!result) {
    return sendResponse(res, {
      success: false,
      statusCode: 404,
      message: "User profile not found",
      data: null,
    })
  }

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User profile updated successfully",
    data: result,
  })
})

const deleteUserProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id
  const result = await userProfileServices.deleteUser(userId)

  if (!result) {
    return sendResponse(res, {
      success: false,
      statusCode: 404,
      message: "User profile not found",
      data: null,
    })
  }

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User profile deleted successfully",
    data: result,
  })
})

export const userProfileController = {
  getUserProfiles,
  getSingleUserProfile,
  updateUserProfile,
  deleteUserProfile,
}
