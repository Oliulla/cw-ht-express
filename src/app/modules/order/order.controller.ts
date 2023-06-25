// order.controller.ts
import { Request, Response } from "express"
import { orderServices } from "./order.service"

// Create a new order
const createOrderController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cow, buyer } = req.body
    // console.log(cow, buyer)

    // Call the createOrder service function
    const order = await orderServices.createOrder(cow, buyer)
    // console.log(order)

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error,
    })
  }
}

// Get all orders
const getAllOrdersController = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    // Call the getAllOrders service function
    const orders = await orderServices.getAllOrders()

    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      data: orders,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve orders",
      error: error,
    })
  }
}

export const orderController = {
  createOrderController,
  getAllOrdersController,
}
