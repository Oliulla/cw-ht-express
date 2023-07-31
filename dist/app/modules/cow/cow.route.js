"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const cow_controller_1 = require("./cow.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
// Define your routes here
router.post("/", (0, auth_1.default)(user_1.ENUM_USER_ROLE.SELLER), cow_controller_1.cowController.createCow);
router.get("/", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SELLER, user_1.ENUM_USER_ROLE.BUYER), cow_controller_1.cowController.getAllCows);
router.get("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SELLER, user_1.ENUM_USER_ROLE.BUYER), cow_controller_1.cowController.getCowById);
router.patch("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.SELLER), cow_controller_1.cowController.updateCowById);
router.delete("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.SELLER), cow_controller_1.cowController.deleteCowById);
exports.cowRoutes = router;
