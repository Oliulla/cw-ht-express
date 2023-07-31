import { Request, Response } from "express"
import { orderService } from "./order.service"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"
import { ENUM_USER_ROLE } from "../../../enums/user"
import { JwtPayload } from "jsonwebtoken"

const createOrderController = catchAsync(
  async (req: Request, res: Response) => {
    const { cow, buyer } = req.body

    // Call the createOrder service function
    const order = await orderService.createOrder(cow, buyer)

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Order created successfully",
      data: order,
    })
  }
)

const getAllOrdersController = catchAsync(
  async (req: Request, res: Response) => {
    // Get user role and ID from the request
    const { role, user_id } = req.user as JwtPayload

    let orders
    if (role === ENUM_USER_ROLE.ADMIN) {
      // If the user is an admin, get all orders
      orders = await orderService.getAllOrders()
    } else if (role === ENUM_USER_ROLE.BUYER) {
      // If the user is a buyer, get orders associated with the specific buyer
      orders = await orderService.getOrdersByBuyer(user_id)
    } else if (role === ENUM_USER_ROLE.SELLER) {
      // If the user is a seller, get orders associated with the specific seller
      orders = await orderService.getOrdersBySeller(user_id)
    }

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Orders retrieved successfully",
      data: orders,
    })
  }
)

const getSingleOrderController = catchAsync(
  async (req: Request, res: Response) => {
    const orderId = req.params.id

    // Get user role and ID from the request
    const { role, user_id } = req.user as JwtPayload

    let order
    if (role === ENUM_USER_ROLE.ADMIN) {
      // If the user is an admin, get the order
      order = await orderService.getOrderById(orderId)
    } else if (role === ENUM_USER_ROLE.BUYER) {
      // If the user is a buyer, get the order by order ID and buyer ID
      order = await orderService.getOrderByBuyer(user_id, orderId)
    } else if (role === ENUM_USER_ROLE.SELLER) {
      // If the user is a seller, get the order by order ID and seller ID
      order = await orderService.getOrderBySeller(user_id, orderId)
    }

    if (!order) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: "Order not found",
        data: null,
      })
    }

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Order information retrieved successfully",
      data: order,
    })
  }
)

export const orderController = {
  createOrderController,
  getAllOrdersController,
  getSingleOrderController,
}
