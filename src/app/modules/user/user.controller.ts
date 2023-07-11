import { Request, RequestHandler, Response } from "express"
import { userServices } from "./user.service"
import sendResponse from "../../../shared/sendResponse"
// import { IUserProfile } from "../userProfile/userProfile.interface"
import catchAsync from "../../../shared/catchAsync"

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...userData } = req.body
    // console.log(userProfile, userData)
    const {
      password,
      role,
      name,
      phoneNumber,
      address,
      budget,
      income = 0,
    } = userData
    const { firstName, lastName } = name
    const newUserData = {
      password,
      role,
      firstName,
      lastName,
      phoneNumber,
      address,
      budget,
      income,
    }

    const result = await userServices.createUser(newUserData)

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "user created successfully!",
      data: result,
    })
  }
)

export const userController = {
  createUser,
}
