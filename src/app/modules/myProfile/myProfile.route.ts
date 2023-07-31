import express from "express"
import { userProfileController } from "./myProfile.controller"
import auth from "../../middlewares/auth"
import { ENUM_USER_ROLE } from "../../../enums/user"
// import { userProfileController } from "./user.controller"

const router = express.Router()

router.get(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  userProfileController.getSingleUserProfile
)
router.patch(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  userProfileController.updateUserProfile
)
router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  userProfileController.deleteUserProfile
)
router.get(
  "/",
  auth(ENUM_USER_ROLE.ADMIN),
  userProfileController.getUserProfiles
)

export const userProfileRoutes = router
