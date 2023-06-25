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
exports.userProfileServices = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("../user/user.model");
const userProfile_model_1 = require("./userProfile.model");
function getUserProfiles() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield user_model_1.User.find().populate("buyer").populate("seller").exec();
        return users;
    });
}
function getSingleUserProfile(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield userProfile_model_1.UserProfile.findById(userId);
        return user;
    });
}
function updateUser(userId, updates) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield userProfile_model_1.UserProfile.findByIdAndUpdate(userId, updates, {
            new: true,
        });
        return user;
    });
}
function deleteUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        // Delete user profile
        const userProfile = yield userProfile_model_1.UserProfile.findByIdAndRemove(userId)
            .populate("buyer")
            .populate("seller")
            .exec();
        if (!userProfile) {
            throw new ApiError_1.default(404, "User not found");
        }
        // Delete corresponding user from users collection
        const user = yield user_model_1.User.findOneAndRemove({
            $or: [{ seller: userId }, { buyer: userId }],
        });
        if (!user) {
            throw new ApiError_1.default(404, "User not found");
        }
        return userProfile;
    });
}
exports.userProfileServices = {
    getUserProfiles,
    getSingleUserProfile,
    updateUser,
    deleteUser,
};
