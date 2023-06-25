"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
// order.route.ts
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
router.post("/", order_controller_1.orderController.createOrderController);
router.get("/", order_controller_1.orderController.getAllOrdersController);
exports.orderRoutes = router;
