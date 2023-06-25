import { NextFunction, Request, Response } from "express"
import { userProfileServices } from "./userProfile.service"

const getUserProfiles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await userProfileServices.getUserProfiles()

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Users retrieve successfully",
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const getSingleUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id
    const result = await userProfileServices.getSingleUserProfile(userId)

    if (!result) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "User profile not found",
        data: null,
      })
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User profile retrieved successfully",
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const updateUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id
    const updates = req.body
    const result = await userProfileServices.updateUser(userId, updates)

    if (!result) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "User profile not found",
        data: null,
      })
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User profile updated successfully",
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const deleteUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id
    const result = await userProfileServices.deleteUser(userId)

    if (!result) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "User profile not found",
        data: null,
      })
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User profile deleted successfully",
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const userProfileController = {
  getUserProfiles,
  getSingleUserProfile,
  updateUserProfile,
  deleteUserProfile,
}
