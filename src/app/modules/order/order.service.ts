import { Label } from "../cow/cow.interface"
import { Cow } from "../cow/cow.model"
import { User } from "../user/user.model"
import { UserProfile } from "../userProfile/userProfile.model"
import { IOrder } from "./order.interface"
import { Order } from "./order.model"

// Create a new order
const createOrder = async (cowId: string, buyerId: string): Promise<IOrder> => {
  const session = await Order.startSession()
  session.startTransaction()

  try {
    // console.log("ekhane paitache")
    const user = await User.findById(buyerId)
    // console.log("ekhane paitachchena")
    // console.log(buyer)

    if (!user) {
      throw new Error("Buyer not found")
    }

    // console.log("pacche")
    const cow = await Cow.findById(cowId)
    // console.log("pachhena")
    // console.log(cow)
    if (!cow) {
      throw new Error("Cow not found")
    }

    // console.log("ekhaneo pacche")
    const buyerProfile = await UserProfile.findOne({ _id: user.buyer })
    // console.log("ekhane ki pacche?")
    // console.log(buyerProfile)
    if (!buyerProfile) {
      throw new Error("Buyer profile not found")
    }

    // console.log("ekhane ki pacche?")
    if (buyerProfile.budget < cow.price) {
      throw new Error("Insufficient budget to buy the cow")
    }

    // console.log("ek?")

    const sellerUser = await User.findOne({ _id: cow.seller })
    // console.log(sellerUser)
    if (!sellerUser) {
      throw new Error("Seller user not found")
    }
    // console.log("sellerUser:?", sellerUser)

    const sellerProfile = await UserProfile.findOne({ _id: sellerUser.seller })

    // console.log(sellerProfile)

    if (!sellerProfile) {
      throw new Error("Seller profile not found")
    }

    buyerProfile.budget -= cow.price
    sellerProfile.income += cow.price
    cow.label = Label.SoldOut

    const order = new Order({
      cow: cowId,
      buyer: buyerId,
    })

    await buyerProfile.save()
    await sellerProfile.save()
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
    .populate("buyer", "phoneNumber role")
    .exec()

  return orders
}

export const orderServices = {
  createOrder,
  getAllOrders,
}
