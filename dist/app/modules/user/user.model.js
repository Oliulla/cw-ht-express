"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_interface_1 = require("./user.interface");
const userSchema = new mongoose_1.Schema({
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: [user_interface_1.UserRole.SELLER, user_interface_1.UserRole.BUYER],
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "UserProfile",
    },
    buyer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "UserProfile",
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.User = (0, mongoose_1.model)("User", userSchema);
