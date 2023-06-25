import express from "express"
import { userRoutes } from "../modules/user/user.route"
import { userProfileRoutes } from "../modules/userProfile/userProfile.route"
import { cowRoutes } from "../modules/cow/cow.route"
import { orderRoutes } from "../modules/order/order.route"
import { adminRoutes } from "../modules/admin/admin.route"

const router = express.Router()

const moduleRoutes = [
  {
    path: "/auth",
    route: userRoutes,
  },
  {
    path: "/users",
    route: userProfileRoutes,
  },
  {
    path: "/admins",
    route: adminRoutes,
  },
  {
    path: "/cows",
    route: cowRoutes,
  },
  {
    path: "/orders",
    route: orderRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
