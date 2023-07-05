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

    const result = await adminService.createAdmin(adminUserData)

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

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User logged in successfully",
      data: {
        accessToken: result.accessToken,
      },
    })
  }
)

export const adminController = {
  createAdmin,
  adminLogin,
}

// import { RequestHandler, Request, Response } from "express"
// import catchAsync from "../../../shared/catchAsync"
// import sendResponse from "../../../shared/sendResponse"
// import { adminService } from "./admin.service"

// const createAdmin: RequestHandler = catchAsync(
//   async (req: Request, res: Response) => {
//     const { ...userData } = req.body

//     const { password, role, name, phoneNumber, address } = userData
//     const { firstName, lastName } = name
//     const adminUserData = {
//       phoneNumber,
//       password,
//       role,
//       firstName,
//       lastName,
//       address,
//     }

//     // console.log(adminProfile, userProps)
//     const result = await adminService.createAdmin(adminUserData)

//     sendResponse(res, {
//       success: true,
//       statusCode: 200,
//       message: "Admin created successfully!",
//       data: result,
//     })
//   }
// )

// export const adminController = {
//   createAdmin,
// }
