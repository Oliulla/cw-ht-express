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
exports.orderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const cow_interface_1 = require("../cow/cow.interface");
const cow_model_1 = require("../cow/cow.model");
const user_model_1 = __importDefault(require("../user/user.model"));
const order_model_1 = require("./order.model");
// Create a new order
const createOrder = (cowId, buyerId) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield order_model_1.Order.startSession();
    session.startTransaction();
    try {
        const user = yield user_model_1.default.findById(buyerId);
        if (!user) {
            throw new Error("Buyer not found");
        }
        const cow = yield cow_model_1.Cow.findById(cowId);
        if (!cow) {
            throw new Error("Cow not found");
        }
        if (cow.label === cow_interface_1.Label.SoldOut) {
            throw new ApiError_1.default(http_status_1.default.CONFLICT, "Cow is sold Out");
        }
        if (user.budget < cow.price) {
            throw new Error("Insufficient budget to buy the cow");
        }
        const sellerUser = yield user_model_1.default.findById(cow.seller);
        if (!sellerUser) {
            throw new Error("Seller user not found");
        }
        user.budget -= cow.price;
        sellerUser.income += cow.price;
        cow.label = cow_interface_1.Label.SoldOut;
        const order = new order_model_1.Order({
            cow: cowId,
            buyer: buyerId,
        });
        yield user.save();
        yield cow.save();
        yield order.save();
        yield session.commitTransaction();
        session.endSession();
        return order;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
// Get all orders
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.Order.find()
        .populate("cow", "name age price location breed weight label category seller")
        .populate("buyer", "name address budget income phoneNumber role")
        .exec();
    return orders;
});
// Get orders by buyer ID
const getOrdersByBuyer = (buyerId) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.Order.find({ buyer: buyerId })
        .populate("cow", "name age price location breed weight label category seller")
        .populate("buyer", "name address budget income phoneNumber role")
        .exec();
    return orders;
});
// Get orders by seller ID
const getOrdersBySeller = (sellerId) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.Order.find({ "cow.seller": sellerId })
        .populate("cow", "name age price location breed weight label category seller")
        .populate("buyer", "name address budget income phoneNumber role")
        .exec();
    return orders;
});
// Get a specific order by ID
const getOrderById = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.Order.findById(orderId)
        .populate({
        path: "cow",
        select: "name age price location breed weight label category seller",
        populate: {
            path: "seller",
            select: "name phoneNumber address budget income role",
        },
    })
        .populate("buyer", "name phoneNumber address budget income role")
        .exec();
    return order;
});
// Get orders by buyer ID
const getOrderByBuyer = (buyerId, orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.Order.findOne({ _id: orderId, buyer: buyerId })
        .populate({
        path: "cow",
        select: "name age price location breed weight label category seller",
        populate: {
            path: "seller",
            select: "name phoneNumber address budget income role",
        },
    })
        .populate("buyer", "name phoneNumber address budget income role")
        .exec();
    return order;
});
// Get orders by seller ID
const getOrderBySeller = (sellerId, orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.Order.findOne({ _id: orderId, "cow.seller": sellerId })
        .populate({
        path: "cow",
        select: "name age price location breed weight label category seller",
        populate: {
            path: "seller",
            select: "name phoneNumber address budget income role",
        },
    })
        .populate("buyer", "name phoneNumber address budget income role")
        .exec();
    return order;
});
exports.orderService = {
    createOrder,
    getAllOrders,
    getOrdersByBuyer,
    getOrdersBySeller,
    getOrderById,
    getOrderByBuyer,
    getOrderBySeller,
};
