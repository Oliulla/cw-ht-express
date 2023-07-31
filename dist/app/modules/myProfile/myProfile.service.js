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
const user_model_1 = __importDefault(require("../user/user.model"));
// get all user
// get all users
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield user_model_1.default.find().select("-password"); // Exclude the 'password' field
        return users;
    });
}
// get single user
function getSingleUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_model_1.default.findById(userId).select("-password");
        return user;
    });
}
// update single user
function updateUser(userId, updates) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_model_1.default.findByIdAndUpdate(userId, updates, {
            new: true,
        }).select("-password");
        if (!user) {
            throw new ApiError_1.default(404, "User not found");
        }
        return user;
    });
}
function deleteUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        // Delete user profile
        const user = yield user_model_1.default.findByIdAndRemove(userId).select("-password");
        if (!user) {
            throw new ApiError_1.default(404, "User not found");
        }
        return user;
    });
}
// Get the profile information of the currently authenticated user
function getMyProfile(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_model_1.default.findById(userId).select("name phoneNumber address");
        if (!user) {
            throw new ApiError_1.default(404, "User not found");
        }
        return user;
    });
}
// Update the profile information of the currently authenticated user
function updateMyProfile(userId, updates) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_model_1.default.findByIdAndUpdate(userId, updates, {
            new: true,
            select: "name phoneNumber address",
        });
        if (!user) {
            throw new ApiError_1.default(404, "User not found");
        }
        return user;
    });
}
exports.userProfileServices = {
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    getMyProfile,
    updateMyProfile,
};
