import { Request, RequestHandler, Response } from "express"
import sendResponse from "../../../shared/sendResponse"
// import { IUserProfile } from "../userProfile/userProfile.interface"
import catchAsync from "../../../shared/catchAsync"
import { userService } from "./user.service"
import config from "../../../config"
import { IRefreshTokenResponse } from "../admin/admin.interface"

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userData = req.body
    // console.log(userData)

    const result = await userService.createUser(userData)

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User created successfully!",
      data: result,
    })
  }
)

const userLogin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { phoneNumber, password } = req.body

    const loginResponse = await userService.userLogin(phoneNumber, password)
    const { refreshToken, ...others } = loginResponse

    const cookieOptions = {
      secure: config.env === "production",
      httpOnly: true,
    }

    res.cookie("refreshToken", refreshToken, cookieOptions)

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User logged in successfully!",
      data: others,
    })
  }
)

const refreshToken: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
      sendResponse(res, {
        success: false,
        statusCode: 401,
        message: "No refresh token provided",
        data: null,
      })
      return
    }

    const newAccessTokenResponse = await userService.refreshToken(refreshToken)

    const cookieOptions = {
      secure: config.env === "production",
      httpOnly: true,
    }

    res.cookie("refreshToken", refreshToken, cookieOptions)

    sendResponse<IRefreshTokenResponse>(res, {
      statusCode: 200,
      success: true,
      message: "New access token generated successfully!",
      data: newAccessTokenResponse,
    })
  }
)

export const userController = {
  createUser,
  userLogin,
  refreshToken,
}
