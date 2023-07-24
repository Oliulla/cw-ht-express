import express from "express"
import { userProfileController } from "./myProfile.controller"
// import { userProfileController } from "./user.controller"

const router = express.Router()

router.get("/:id", userProfileController.getSingleUserProfile)
router.patch("/:id", userProfileController.updateUserProfile)
router.delete("/:id", userProfileController.deleteUserProfile)
router.get("/", userProfileController.getUserProfiles)

export const userProfileRoutes = router
