"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
// order.model.ts
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    cow: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Cow",
        required: true,
    },
    buyer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});
exports.Order = (0, mongoose_1.model)("Order", orderSchema);
