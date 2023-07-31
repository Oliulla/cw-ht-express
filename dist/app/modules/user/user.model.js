"use strict";
// user.model.ts
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
const mongoose_1 = __importDefault(require("mongoose"));
const user_interface_1 = require("./user.interface");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
const userSchema = new mongoose_1.default.Schema({
    password: { type: String, required: true },
    role: {
        type: String,
        enum: [user_interface_1.UserRole.SELLER, user_interface_1.UserRole.BUYER, user_interface_1.UserRole.ADMIN],
        required: true,
    },
    name: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
    },
    phoneNumber: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    budget: { type: Number, required: true },
    income: { type: Number, default: 0 },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
// Hash the password before saving
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password")) {
            return next();
        }
        try {
            const salt = yield bcrypt_1.default.genSalt(Number(config_1.default.bcrypt_salt_rounds));
            this.password = yield bcrypt_1.default.hash(this.password, salt);
            return next();
        }
        catch (error) {
            return next(error); // Cast 'error' to 'Error'
        }
    });
});
// We use IUser to define both Document and Model for type safety
const UserModel = mongoose_1.default.model("User", userSchema);
exports.default = UserModel;
