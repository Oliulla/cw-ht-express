"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cow = void 0;
const mongoose_1 = require("mongoose");
const cow_interface_1 = require("./cow.interface");
const locationValues = Object.values(cow_interface_1.Location);
const labelValues = Object.values(cow_interface_1.Label);
const categoryValues = Object.values(cow_interface_1.Category);
const cowSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    price: { type: Number, required: true },
    location: { type: String, enum: locationValues, required: true },
    breed: { type: String, required: true },
    weight: { type: Number, required: true },
    label: { type: String, enum: labelValues, required: true },
    category: { type: String, enum: categoryValues, required: true },
    seller: { type: mongoose_1.Types.ObjectId, ref: "User", required: true },
});
exports.Cow = (0, mongoose_1.model)("Cow", cowSchema);
