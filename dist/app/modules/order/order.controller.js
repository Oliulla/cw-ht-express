"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const order_service_1 = require("./order.service");
// Create a new order
const createOrderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cow, buyer } = req.body;
        // console.log(cow, buyer)
        // Call the createOrder service function
        const order = yield order_service_1.orderServices.createOrder(cow, buyer);
        // console.log(order)
        res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: order,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create order",
            error: error,
        });
    }
});
// Get all orders
const getAllOrdersController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Call the getAllOrders service function
        const orders = yield order_service_1.orderServices.getAllOrders();
        res.status(200).json({
            success: true,
            message: "Orders retrieved successfully",
            data: orders,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve orders",
            error: error,
        });
    }
});
exports.orderController = {
    createOrderController,
    getAllOrdersController,
};
