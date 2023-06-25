"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/user/user.route");
const userProfile_route_1 = require("../modules/userProfile/userProfile.route");
const cow_route_1 = require("../modules/cow/cow.route");
const order_route_1 = require("../modules/order/order.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/auth",
        route: user_route_1.userRoutes,
    },
    {
        path: "/users",
        route: userProfile_route_1.userProfileRoutes,
    },
    {
        path: "/cows",
        route: cow_route_1.cowRoutes,
    },
    {
        path: "/orders",
        route: order_route_1.orderRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
