import express from "express"
import { cowController } from "./cow.controller"

const router = express.Router()

// Define your routes here
router.post("/", cowController.createCow)
router.get("/", cowController.getAllCows)
router.get("/:id", cowController.getCowById)
router.patch("/:id", cowController.updateCowById)
router.delete("/:id", cowController.deleteCowById)

export const cowRoutes = router
