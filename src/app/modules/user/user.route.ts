import express from "express"
import { userController } from "./user.controller"

const router = express.Router()

router.post("/signup", userController.createUser)
router.post("/login", userController.userLogin)
router.post("/refresh-token", userController.refreshToken)

export const userRoutes = router
