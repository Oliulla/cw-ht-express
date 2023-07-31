import express from "express"
import { userProfileController } from "./myProfile.controller"
import auth from "../../middlewares/auth"
import { ENUM_USER_ROLE } from "../../../enums/user"

const router = express.Router()

router.get(
  "/my-profile",
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  userProfileController.getMyProfile
)
router.patch(
  "/my-profile",
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  userProfileController.updateMyProfile
)

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
