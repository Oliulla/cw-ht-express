// order.route.ts
import express from "express"
import { orderController } from "./order.controller"

const router = express.Router()

router.post("/", orderController.createOrderController)
router.get("/", orderController.getAllOrdersController)

export const orderRoutes = router
