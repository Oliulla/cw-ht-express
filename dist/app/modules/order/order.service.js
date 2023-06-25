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
exports.orderServices = void 0;
const cow_interface_1 = require("../cow/cow.interface");
const cow_model_1 = require("../cow/cow.model");
const user_model_1 = require("../user/user.model");
const userProfile_model_1 = require("../userProfile/userProfile.model");
const order_model_1 = require("./order.model");
// Create a new order
const createOrder = (cowId, buyerId) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield order_model_1.Order.startSession();
    session.startTransaction();
    try {
        // console.log("ekhane paitache")
        const user = yield user_model_1.User.findById(buyerId);
        // console.log("ekhane paitachchena")
        // console.log(buyer)
        if (!user) {
            throw new Error("Buyer not found");
        }
        // console.log("pacche")
        const cow = yield cow_model_1.Cow.findById(cowId);
        // console.log("pachhena")
        // console.log(cow)
        if (!cow) {
            throw new Error("Cow not found");
        }
        // console.log("ekhaneo pacche")
        const buyerProfile = yield userProfile_model_1.UserProfile.findOne({ _id: user.buyer });
        // console.log("ekhane ki pacche?")
        // console.log(buyerProfile)
        if (!buyerProfile) {
            throw new Error("Buyer profile not found");
        }
        // console.log("ekhane ki pacche?")
        if (buyerProfile.budget < cow.price) {
            throw new Error("Insufficient budget to buy the cow");
        }
        // console.log("ek?")
        const sellerUser = yield user_model_1.User.findOne({ _id: cow.seller });
        console.log(sellerUser);
        if (!sellerUser) {
            throw new Error("Seller profile not found");
        }
        console.log("sellerUser:?", sellerUser);
        const sellerProfile = yield userProfile_model_1.UserProfile.findOne({ _id: sellerUser.seller });
        console.log(sellerProfile);
        buyerProfile.budget -= cow.price;
        sellerProfile.income += cow.price;
        cow.label = cow_interface_1.Label.SoldOut;
        const order = new order_model_1.Order({
            cow: cowId,
            buyer: buyerId,
        });
        yield buyerProfile.save();
        yield sellerProfile.save();
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
        .populate("buyer", "phoneNumber role")
        .exec();
    return orders;
});
exports.orderServices = {
    createOrder,
    getAllOrders,
};
