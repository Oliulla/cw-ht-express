import express from "express"
import { orderController } from "./order.controller"
import auth from "../../middlewares/auth"
import { ENUM_USER_ROLE } from "../../../enums/user"

const router = express.Router()

// Create a new order
router.post(
  "/",
  auth(ENUM_USER_ROLE.BUYER),
  orderController.createOrderController
)

// Get all orders (accessible by admin, buyer, and seller)
router.get(
  "/",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  orderController.getAllOrdersController
)

// Get a specific order (accessible by admin, buyer, and seller)
router.get(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  orderController.getSingleOrderController
)

export const orderRoutes = router
