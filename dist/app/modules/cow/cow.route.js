"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const cow_controller_1 = require("./cow.controller");
const router = express_1.default.Router();
// Define your routes here
router.post("/", cow_controller_1.cowController.createCow);
router.get("/", cow_controller_1.cowController.getAllCows);
router.get("/:id", cow_controller_1.cowController.getCowById);
router.patch("/:id", cow_controller_1.cowController.updateCowById);
router.delete("/:id", cow_controller_1.cowController.deleteCowById);
exports.cowRoutes = router;
