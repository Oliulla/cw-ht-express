"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfileRoutes = void 0;
const express_1 = __importDefault(require("express"));
const myProfile_controller_1 = require("./myProfile.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.get("/my-profile", (0, auth_1.default)(user_1.ENUM_USER_ROLE.BUYER, user_1.ENUM_USER_ROLE.SELLER), myProfile_controller_1.userProfileController.getMyProfile);
router.patch("/my-profile", (0, auth_1.default)(user_1.ENUM_USER_ROLE.BUYER, user_1.ENUM_USER_ROLE.SELLER), myProfile_controller_1.userProfileController.updateMyProfile);
router.get("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), myProfile_controller_1.userProfileController.getSingleUserProfile);
router.patch("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), myProfile_controller_1.userProfileController.updateUserProfile);
router.delete("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), myProfile_controller_1.userProfileController.deleteUserProfile);
router.get("/", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), myProfile_controller_1.userProfileController.getUserProfiles);
exports.userProfileRoutes = router;
