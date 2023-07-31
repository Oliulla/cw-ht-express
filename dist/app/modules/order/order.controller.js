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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const order_service_1 = require("./order.service");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const user_1 = require("../../../enums/user");
const createOrderController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cow, buyer } = req.body;
    // Call the createOrder service function
    const order = yield order_service_1.orderService.createOrder(cow, buyer);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Order created successfully",
        data: order,
    });
}));
const getAllOrdersController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get user role and ID from the request
    const { role, user_id } = req.user;
    let orders;
    if (role === user_1.ENUM_USER_ROLE.ADMIN) {
        // If the user is an admin, get all orders
        orders = yield order_service_1.orderService.getAllOrders();
    }
    else if (role === user_1.ENUM_USER_ROLE.BUYER) {
        // If the user is a buyer, get orders associated with the specific buyer
        orders = yield order_service_1.orderService.getOrdersByBuyer(user_id);
    }
    else if (role === user_1.ENUM_USER_ROLE.SELLER) {
        // If the user is a seller, get orders associated with the specific seller
        orders = yield order_service_1.orderService.getOrdersBySeller(user_id);
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Orders retrieved successfully",
        data: orders,
    });
}));
const getSingleOrderController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.id;
    // Get user role and ID from the request
    const { role, user_id } = req.user;
    let order;
    if (role === user_1.ENUM_USER_ROLE.ADMIN) {
        // If the user is an admin, get the order
        order = yield order_service_1.orderService.getOrderById(orderId);
    }
    else if (role === user_1.ENUM_USER_ROLE.BUYER) {
        // If the user is a buyer, get the order by order ID and buyer ID
        order = yield order_service_1.orderService.getOrderByBuyer(user_id, orderId);
    }
    else if (role === user_1.ENUM_USER_ROLE.SELLER) {
        // If the user is a seller, get the order by order ID and seller ID
        order = yield order_service_1.orderService.getOrderBySeller(user_id, orderId);
    }
    if (!order) {
        return (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: http_status_1.default.NOT_FOUND,
            message: "Order not found",
            data: null,
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Order information retrieved successfully",
        data: order,
    });
}));
exports.orderController = {
    createOrderController,
    getAllOrdersController,
    getSingleOrderController,
};
