"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfileRoutes = void 0;
const express_1 = __importDefault(require("express"));
const userProfile_controller_1 = require("./userProfile.controller");
// import { userProfileController } from "./user.controller"
const router = express_1.default.Router();
router.get("/:id", userProfile_controller_1.userProfileController.getSingleUserProfile);
router.patch("/:id", userProfile_controller_1.userProfileController.updateUserProfile);
router.delete("/:id", userProfile_controller_1.userProfileController.deleteUserProfile);
router.get("/", userProfile_controller_1.userProfileController.getUserProfiles);
exports.userProfileRoutes = router;
