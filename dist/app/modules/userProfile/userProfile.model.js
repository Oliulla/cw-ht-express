"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfile = void 0;
const mongoose_1 = require("mongoose");
// type IUserProfile = {
//   name: {
//     firstName: string
//     lastName: string
//   }
//   address: string
//   budget: number
//   income: number
// }
const userProfileSchema = new mongoose_1.Schema({
    name: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
    },
    address: {
        type: String,
        required: true,
    },
    budget: {
        type: Number,
        required: true,
    },
    income: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
exports.UserProfile = (0, mongoose_1.model)("UserProfile", userProfileSchema);
