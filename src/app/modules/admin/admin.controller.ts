import { RequestHandler, Request, Response } from "express"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import { adminService } from "./admin.service"
import config from "../../../config"
import { IRefreshTokenResponse } from "./admin.interface"

const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const adminData = req.body
    // console.log(adminData)

    const result = await adminService.createAdmin(adminData)

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Admin created successfully!",
      data: result,
    })
  }
)

const adminLogin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { phoneNumber, password } = req.body

    // Call the adminService method to handle login logic
    const result = await adminService.adminLogin(phoneNumber, password)
    const { refreshToken, ...others } = result

    const cookieOptions = {
      secure: config.env === "production",
      httpOnly: true,
    }

    res.cookie("refreshToken", refreshToken, cookieOptions)

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User logged in successfully",
      data: others,
    })
  }
)

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies

  const result = await adminService.refreshToken(refreshToken)

  // set refresh token into cookie

  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  }

  res.cookie("refreshToken", refreshToken, cookieOptions)

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully !",
    data: result,
  })
})

export const adminController = {
  createAdmin,
  adminLogin,
  refreshToken,
}
