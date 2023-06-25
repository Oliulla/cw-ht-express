import express from "express"
import { adminController } from "./admin.controller"

const router = express.Router()

// router.get("/:id", AdminController.getSingleAdmin)
// router.get("/:id", AdminController.deleteAdmin)
// router.patch("/:id", AdminController.updateAdmin)

// router.get("/", AdminController.getAllAdmins)

router.post("/create-admin", adminController.createAdmin)

export const adminRoutes = router
