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
exports.userServices = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const userProfile_model_1 = require("../userProfile/userProfile.model");
const user_interface_1 = require("./user.interface");
const user_model_1 = require("./user.model");
function createUser(profileData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { firstName, lastName, address, budget, income, phoneNumber, role, password, } = profileData;
        // Check if the phoneNumber already exists in the users collection
        const existingUser = yield user_model_1.User.findOne({ phoneNumber }).exec();
        if (existingUser) {
            throw new ApiError_1.default(400, "User with the provided phone number already exists");
        }
        if (!existingUser) {
            const userProfile = new userProfile_model_1.UserProfile({
                name: {
                    firstName,
                    lastName,
                },
                address,
                budget: role === "seller" ? 0 : budget,
                income,
            });
            yield userProfile.save();
            const user = new user_model_1.User({
                phoneNumber,
                role,
                password,
                createdAt: new Date(),
                updatedAt: new Date(),
                seller: role === user_interface_1.UserRole.SELLER ? userProfile._id : undefined,
                buyer: role === user_interface_1.UserRole.BUYER ? userProfile._id : undefined,
            });
            yield user.save();
            return userProfile;
        }
    });
}
exports.userServices = {
    createUser,
};
