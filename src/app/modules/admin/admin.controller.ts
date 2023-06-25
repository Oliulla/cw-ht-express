import { RequestHandler, Request, Response } from "express"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import { adminService } from "./admin.service"

const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...userData } = req.body

    const { password, role, name, phoneNumber, address } = userData
    const { firstName, lastName } = name
    const adminUserData = {
      phoneNumber,
      password,
      role,
      firstName,
      lastName,
      address,
    }

    // console.log(adminProfile, userProps)
    const result = await adminService.createAdmin(adminUserData)

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Admin created successfully!",
      data: result,
    })
  }
)

export const adminController = {
  createAdmin,
}
