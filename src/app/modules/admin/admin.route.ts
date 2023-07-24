import express from "express"
import { adminController } from "./admin.controller"

const router = express.Router()

router.post("/create-admin", adminController.createAdmin)
router.post("/login", adminController.adminLogin)

router.post("/refresh-token", adminController.refreshToken)

export const adminRoutes = router
