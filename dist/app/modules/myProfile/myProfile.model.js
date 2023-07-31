"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfile = void 0;
const mongoose_1 = require("mongoose");
const userProfileSchema = new mongoose_1.Schema({
    role: String,
    password: {
        type: String,
    },
    name: {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
    },
    phoneNumber: {
        type: String,
        unique: true,
    },
    address: {
        type: String,
    },
    budget: {
        type: Number,
    },
    income: {
        type: Number,
    },
});
exports.UserProfile = (0, mongoose_1.model)("UserProfile", userProfileSchema);
