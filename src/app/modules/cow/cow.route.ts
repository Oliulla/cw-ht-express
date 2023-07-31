import express from "express"
import { cowController } from "./cow.controller"
import auth from "../../middlewares/auth"
import { ENUM_USER_ROLE } from "../../../enums/user"

const router = express.Router()

// Define your routes here
router.post("/", auth(ENUM_USER_ROLE.SELLER), cowController.createCow)
router.get(
  "/",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER),
  cowController.getAllCows
)
router.get(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER),
  cowController.getCowById
)
router.patch("/:id", auth(ENUM_USER_ROLE.SELLER), cowController.updateCowById)
router.delete("/:id", auth(ENUM_USER_ROLE.SELLER), cowController.deleteCowById)

export const cowRoutes = router
