import httpStatus from "http-status"
import ApiError from "../../../errors/ApiError"
import { Label } from "../cow/cow.interface"
import { Cow } from "../cow/cow.model"
import UserModel from "../user/user.model"
import { IOrder } from "./order.interface"
import { Order } from "./order.model"

// Create a new order
const createOrder = async (cowId: string, buyerId: string): Promise<IOrder> => {
  const session = await Order.startSession()
  session.startTransaction()

  try {
    const user = await UserModel.findById(buyerId)

    if (!user) {
      throw new Error("Buyer not found")
    }

    const cow = await Cow.findById(cowId)

    if (!cow) {
      throw new Error("Cow not found")
    }

    if (cow.label === Label.SoldOut) {
      throw new ApiError(httpStatus.CONFLICT, "Cow is sold Out")
    }

    if (user.budget < cow.price) {
      throw new Error("Insufficient budget to buy the cow")
    }

    const sellerUser = await UserModel.findById(cow.seller)

    if (!sellerUser) {
      throw new Error("Seller user not found")
    }

    user.budget -= cow.price
    sellerUser.income += cow.price
    cow.label = Label.SoldOut

    const order = new Order({
      cow: cowId,
      buyer: buyerId,
    })

    await user.save()
    await cow.save()
    await order.save()

    await session.commitTransaction()
    session.endSession()

    return order
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw error
  }
}

// Get all orders
const getAllOrders = async (): Promise<IOrder[]> => {
  const orders = await Order.find()
    .populate(
      "cow",
      "name age price location breed weight label category seller"
    )
    .populate("buyer", "name address budget income phoneNumber role")
    .exec()

  return orders
}

// Get orders by buyer ID
const getOrdersByBuyer = async (buyerId: string): Promise<IOrder[]> => {
  const orders = await Order.find({ buyer: buyerId })
    .populate(
      "cow",
      "name age price location breed weight label category seller"
    )
    .populate("buyer", "name address budget income phoneNumber role")
    .exec()

  return orders
}

// Get orders by seller ID
const getOrdersBySeller = async (sellerId: string): Promise<IOrder[]> => {
  const orders = await Order.find({ "cow.seller": sellerId })
    .populate(
      "cow",
      "name age price location breed weight label category seller"
    )
    .populate("buyer", "name address budget income phoneNumber role")
    .exec()

  return orders
}

// Get a specific order by ID
const getOrderById = async (orderId: string): Promise<IOrder | null> => {
  const order = await Order.findById(orderId)
    .populate({
      path: "cow",
      select: "name age price location breed weight label category seller",
      populate: {
        path: "seller",
        select: "name phoneNumber address budget income role",
      },
    })
    .populate("buyer", "name phoneNumber address budget income role")
    .exec()

  return order
}

// Get orders by buyer ID
const getOrderByBuyer = async (
  buyerId: string,
  orderId: string
): Promise<IOrder | null> => {
  const order = await Order.findOne({ _id: orderId, buyer: buyerId })
    .populate({
      path: "cow",
      select: "name age price location breed weight label category seller",
      populate: {
        path: "seller",
        select: "name phoneNumber address budget income role",
      },
    })
    .populate("buyer", "name phoneNumber address budget income role")
    .exec()

  return order
}

// Get orders by seller ID
const getOrderBySeller = async (
  sellerId: string,
  orderId: string
): Promise<IOrder | null> => {
  const order = await Order.findOne({ _id: orderId, "cow.seller": sellerId })
    .populate({
      path: "cow",
      select: "name age price location breed weight label category seller",
      populate: {
        path: "seller",
        select: "name phoneNumber address budget income role",
      },
    })
    .populate("buyer", "name phoneNumber address budget income role")
    .exec()

  return order
}

export const orderService = {
  createOrder,
  getAllOrders,
  getOrdersByBuyer,
  getOrdersBySeller,
  getOrderById,
  getOrderByBuyer,
  getOrderBySeller,
}
