import { Request, RequestHandler, Response } from "express"
import sendResponse from "../../../shared/sendResponse"
// import { IUserProfile } from "../userProfile/userProfile.interface"
import catchAsync from "../../../shared/catchAsync"
import { userServices } from "./user.service"

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userData = req.body
    // console.log(userData)

    const result = await userServices.createUser(userData)

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User created successfully!",
      data: result,
    })
  }
)

export const userController = {
  createUser,
}
